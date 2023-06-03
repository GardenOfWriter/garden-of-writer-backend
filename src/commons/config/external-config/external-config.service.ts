import { ApolloDriverConfig } from '@nestjs/apollo';
import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { join } from 'path';
import { ENV_KEY } from '../app-config/app-config.constant';
import { AppConfigService } from '../app-config/app-config.service';

@Injectable()
export class ExternalConfigService
  implements TypeOrmOptionsFactory, CacheOptionsFactory, GqlOptionsFactory
{
  constructor(private readonly appConfigService: AppConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.appConfigService.get<'mysql'>(ENV_KEY.DATABASE_TYPE),
      host: this.appConfigService.get<string>(ENV_KEY.DATABASE_HOST),
      port: this.appConfigService.get<number>(ENV_KEY.DATABASE_PORT),
      username: this.appConfigService.get<string>(ENV_KEY.DATABASE_USERNAME),
      password: this.appConfigService.get<string>(ENV_KEY.DATABASE_PASSWORD),
      database: this.appConfigService.get<string>(ENV_KEY.DATABASE_DATABASE),
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
    };
  }

  createCacheOptions(): CacheModuleOptions {
    return {
      store: redisStore,
      host: 'localhost',
      port: 6379,
      isGlobal: true,
    };
  }

  createGqlOptions(): ApolloDriverConfig {
    return {
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
    };
  }
}