import { GraphQLModule } from '@nestjs/graphql';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BigIntResolver } from 'graphql-scalars';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { AuthModule } from './resolvers/auth/auth.module';
import { UserModule } from './resolvers/user/user.module';
import { AppResolver } from './resolvers/app.resolver';
import config from './configs/config';
import { GraphqlConfig } from './configs/config.interface';
import { PrismaModule } from './modules/prisma.module';
import { TerminusModule } from '@nestjs/terminus';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NftModule } from './resolvers/nft/nft.module';
import { TransactionModule } from './resolvers/transaction/transaction.module';
import { TestModule } from './resolvers/test/test.module';
import { Web3Module } from './modules/web3.module';
import { EstateModule } from './resolvers/estates/estates.module';
import { HistoryModule } from './resolvers/history/history.module';
import { BigIntScalar } from './common/scalars/bigint.scalar';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './gql-config.service';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService
    }),
    // GraphQLModule.forRoot({
    //   typePaths: ['./**/*.graphql'],
    //   resolvers: {
    //     'BigInt': BigIntResolver
    //   }
    // }),
    AuthModule,
    UserModule,
    NftModule,
    EstateModule,
    HistoryModule,
    TransactionModule,
    // Web3Module,
    TestModule,
    PrismaModule,
    TerminusModule,
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 100,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false
    })
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, BigIntScalar],
  exports: []
})
export class AppModule {}
