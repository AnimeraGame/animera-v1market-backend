import { Injectable } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { RMQ_ROUTES_OPTIONS } from './rmq.constants';
import { RMQHandler } from './types';

@Injectable()
export class RmqExplorer {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScannerService: MetadataScanner
  ) {}

  public get handlers() {
    const providers = this.discoveryService.getProviders();
    const handlers: RMQHandler[] = [];

    providers.forEach(provider => {
      const { instance } = provider;

      if (instance) {
        const prototype = Object.getPrototypeOf(instance);

        if (prototype) {
          this.metadataScannerService.scanFromPrototype(
            instance,
            prototype,
            name => {
              const handler = prototype[name];

              const meta = Reflect.getMetadata(RMQ_ROUTES_OPTIONS, handler);

              if (meta) {
                handlers.push({
                  meta,
                  discoveredMethod: {
                    handler,
                    methodName: name,
                    parentClass: instance
                  }
                });
              }
            }
          );
        }
      }
    });

    return handlers;
  }
}
