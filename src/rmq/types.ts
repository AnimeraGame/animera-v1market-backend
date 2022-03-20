export interface RMQConnection {
  login: string;
  password: string;
  host: string;
  port: string;
  vhost: string;
}

export type RMQExchangeType = 'topic' | 'direct' | 'x-delayed-message';

export interface RMQExchange {
  name: string;
  durable: boolean;
  type: RMQExchangeType;
  arguments?: {
    [key: string]: unknown;
  };
}

export interface RMQModuleOptions {
  exchange: RMQExchange;
  connection: RMQConnection;
  reconnectTimeInSeconds?: number;
  heartbeatIntervalInSeconds?: number;
  prefetchCount?: number;
  isGlobalPrefetchCount?: boolean;
}

export interface RouteOptions {
  exchange: string;
  routingKey: string;
  queue: string;
}

export type TRMQResponse = 'ack' | 'nack' | 'reject';

export interface RMQHandler {
  meta: RouteOptions;
  discoveredMethod: {
    handler: any;
    methodName: string;
    parentClass: any;
  };
}
