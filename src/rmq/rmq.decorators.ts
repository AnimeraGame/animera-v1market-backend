import { applyDecorators, SetMetadata } from '@nestjs/common';
import { RMQ_ROUTES_OPTIONS } from './rmq.constants';
import { RouteOptions } from './types';

export const RMQSubscription = (options: RouteOptions): MethodDecorator => applyDecorators(
    SetMetadata(RMQ_ROUTES_OPTIONS, {
      ...options
    })
  );
