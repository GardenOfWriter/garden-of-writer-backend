import { ApolloDriverConfig } from '@nestjs/apollo';
import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ENV_KEY } from '@src/commons/config/app-config/app-config.constant';
import { AppConfigService } from '@src/commons/config/app-config/app-config.service';
import redisStore from 'cache-manager-redis-store';
import { join } from 'path';

@Injectable()
export class ExternalConfigService
  implements TypeOrmOptionsFactory, CacheOptionsFactory, GqlOptionsFactory
{
  constructor(private readonly appConfigService: AppConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.appConfigService.get<'postgres'>(ENV_KEY.DATABASE_TYPE),
      schema: this.appConfigService.get(ENV_KEY.DATABASE_SCHEMA),
      host: this.appConfigService.get<string>(ENV_KEY.DATABASE_HOST),
      port: this.appConfigService.get<number>(ENV_KEY.DATABASE_PORT),
      username: this.appConfigService.get<string>(ENV_KEY.DATABASE_USERNAME),
      password: this.appConfigService.get<string>(ENV_KEY.DATABASE_PASSWORD),
      database: this.appConfigService.get<string>(ENV_KEY.DATABASE_DATABASE),
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    };
  }

  createCacheOptions(): CacheModuleOptions {
    return {
      store: redisStore,
      host: this.appConfigService.get<string>(ENV_KEY.CACHE_STORE_HOST),
      port: this.appConfigService.get<number>(ENV_KEY.CACHE_STORE_PORT),
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
