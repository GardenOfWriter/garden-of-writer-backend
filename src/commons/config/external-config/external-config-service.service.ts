import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModuleOptions, Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { ENV_KEY } from '../app-config/app-config.constant';
import { AppConfigService } from '../app-config/app-config.service';

@Injectable()
export class ExternalConfigServiceService implements TypeOrmOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.appConfigService.get<'mysql'>(ENV_KEY.DATABASE_TYPE),
      host: this.appConfigService.get<string>(ENV_KEY.DATABASE_HOST),
      port: this.appConfigService.get<number>(ENV_KEY.DATABASE_PORT),
      username: this.appConfigService.get<string>(ENV_KEY.DATABASE_USERNAME),
      password: this.appConfigService.get<string>(ENV_KEY.DATABASE_PASSWORD),
      database: this.appConfigService.get<string>(ENV_KEY.DATABASE_DATABASE),
      entities: [__dirname + '/../../' + 'apis/**/*.entity.*'],
      synchronize: false,
      logging: true,
    };
  }

  createRedisClientOptions(): CacheModuleOptions<RedisClientOptions> {
    return {
      store: redisStore,
      url: 'redis://my-redis:6379',
      isGlobal: true,
    };
  }

  createApolloDriverConfig(): ApolloDriverConfig {
    return {
      driver: ApolloDriver,
      autoSchemaFile: 'src/common/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    };
  }
}
