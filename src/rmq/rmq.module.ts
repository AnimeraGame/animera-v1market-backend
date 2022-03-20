import { Global, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { LoggerService } from '../logger/logger.service';
import { RMQ_MODULE_OPTIONS } from './rmq.constants';
import { RmqExplorer } from './rmq.explorer';
import { RmqService } from './rmq.service';
import config from '../configs/config';
import { PrismaService } from '../services/prisma.service';

const { rabbitmqConfig, marketplaceConfig } = config();

@Global()
@Module({
  imports: [
    DiscoveryModule,
    MetadataScanner,
    RmqService,
    RmqExplorer,
    LoggerService
  ],
  providers: [
    {
      provide: LoggerService,
      useValue: new LoggerService('RmqModule')
    },
    {
      provide: RMQ_MODULE_OPTIONS,
      useValue: {
        exchange: {
          name: marketplaceConfig.rabbitmqConfig.exchange,
          durable: true,
          type: marketplaceConfig.rabbitmqConfig.exchangeType
        },
        connection: {
          login: rabbitmqConfig.username,
          password: rabbitmqConfig.password,
          host: rabbitmqConfig.host,
          port: rabbitmqConfig.port,
          vhost: rabbitmqConfig.vhost
        }
      }
    },
    RmqExplorer,
    RmqService,
    PrismaService
  ],
  exports: [
    RmqService,
    RMQ_MODULE_OPTIONS,
    RmqExplorer,
    LoggerService,
    DiscoveryModule,
    MetadataScanner
  ]
})
export class RmqModule {}
