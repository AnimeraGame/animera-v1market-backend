import EventEmitter from 'events';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  AmqpConnectionManager,
  ChannelWrapper,
  connect
} from 'amqp-connection-manager';
import { Channel, ConfirmChannel, Connection, Message } from 'amqplib';
import { v4 } from 'uuid';
import { LoggerService } from '../logger/logger.service';
import {
  CONNECT_EVENT,
  DISCONNECT_EVENT,
  ERROR_EVENT,
  RMQ_MODULE_OPTIONS,
  RMQ_REPLY_QUEUE
} from './rmq.constants';
import { RmqExplorer } from './rmq.explorer';
import {
  RMQConnection,
  RMQHandler,
  RMQModuleOptions,
  TRMQResponse
} from './types';

@Injectable()
export class RmqService implements OnModuleInit {
  protected server: AmqpConnectionManager;
  protected connection: Connection;
  protected clientChannel: ChannelWrapper;
  protected subscriptionChannel: ChannelWrapper;
  protected sendResponseEmitter: EventEmitter = new EventEmitter();

  constructor(
    @Inject(RMQ_MODULE_OPTIONS) private readonly options: RMQModuleOptions,
    private readonly rmqExplorerService: RmqExplorer,
    private readonly logger: LoggerService
  ) {}

  static createConnectionUri(connection: RMQConnection): string {
    let uri = `amqp://${connection.login}:${connection.password}@${connection.host}`;

    if (connection.port) {
      uri += `:${connection.port}`;
    }

    if (connection.vhost) {
      uri += `/${connection.vhost}`;
    }

    return uri;
  }

  async onModuleInit() {
    const connectionUri = RmqService.createConnectionUri(
      this.options.connection
    );

    const connectionOptions = {
      reconnectTimeInSeconds: this.options.reconnectTimeInSeconds ?? 5,
      heartbeatIntervalInSeconds: this.options.heartbeatIntervalInSeconds ?? 5
    };

    this.server = connect([connectionUri], connectionOptions);

    this.server.on(CONNECT_EVENT, (connection: Connection) => {
      this.connection = connection;

      this.logger.info('RMQModule connected');
    });

    this.server.addListener(ERROR_EVENT, (err: unknown) => {
      this.logger.error(err);
    });

    this.server.addListener(DISCONNECT_EVENT, (err: any) => {
      this.logger.error(err);

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.close();
    });

    await Promise.all([
      this.createSubscriptionChannel(),
      this.createClientChannel()
    ]);

    const { handlers } = this.rmqExplorerService;

    await Promise.all(handlers.map(handler => this.createQueue(handler)));

    this.logger.info('RMQModule dependencies initialized');
  }

  private async createSubscriptionChannel() {
    this.subscriptionChannel = this.server.createChannel({
      json: false,
      setup: async (channel: Channel) => {
        await channel.assertExchange(
          this.options.exchange.name,
          this.options.exchange.type,
          {
            durable: this.options.exchange.durable,
            arguments: { 'x-delayed-type': 'direct' }
          }
        );

        await channel.prefetch(
          this.options.prefetchCount ?? 0,
          this.options.isGlobalPrefetchCount ?? false
        );
      }
    });
  }

  private async createClientChannel() {
    this.clientChannel = this.server.createChannel({
      json: false,
      setup: async (channel: Channel) => {
        await channel.consume(
          RMQ_REPLY_QUEUE,
          (msg: Message) => {
            this.sendResponseEmitter.emit(msg.properties.correlationId, msg);
          },
          {
            noAck: true
          }
        );
      }
    });
  }

  private async close(): Promise<void> {
    if (this.subscriptionChannel) {
      await this.subscriptionChannel.close();
    }

    if (this.clientChannel) {
      await this.clientChannel.close();
    }

    if (this.server) {
      await this.server.close();
    }

    this.sendResponseEmitter.removeAllListeners();

    this.server = null;
    this.subscriptionChannel = null;
    this.clientChannel = null;
    this.connection = null;
  }

  public async send<T>(routing_key: string, message: T, delay?: number) {
    await this.clientChannel.publish(
      this.options.exchange.name,
      routing_key,
      Buffer.from(JSON.stringify(message)),
      {
        replyTo: RMQ_REPLY_QUEUE,
        timestamp: new Date().getTime(),
        correlationId: v4(),
        headers: delay ? { 'x-delay': delay } : undefined
      }
    );
  }

  public async createQueue(handler: RMQHandler) {
    await this.subscriptionChannel.addSetup(async (channel: ConfirmChannel) => {
      const { queue } = await channel.assertQueue(handler.meta.queue, {});

      await channel.bindQueue(
        queue,
        handler.meta.exchange,
        handler.meta.routingKey
      );

      this.logger.info(`bindQueue - ${handler.meta.routingKey}`);

      await channel.consume(
        queue,
        // only for types from library
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        async (msg): Promise<void> => {
          this.logger.info(`consume - ${handler.meta.routingKey}`);

          const msgContent = msg.content.toString();

          const response: TRMQResponse =
            await handler.discoveredMethod.parentClass[
              handler.discoveredMethod.methodName
            ](JSON.parse(msgContent));

          if (response === 'ack') {
            channel.ack(msg, false);
          }

          if (response === 'nack') {
            channel.nack(msg, false, false);
          }

          if (response === 'reject') {
            channel.reject(msg, false);
          }
        }
      );
    });
  }
}
