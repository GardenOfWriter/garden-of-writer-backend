import { ApolloDriver } from '@nestjs/apollo';
import { Test, TestingModule } from '@nestjs/testing';
import * as redisStore from 'cache-manager-redis-store';
import { AppConfigService } from './app-config.service';
import { ExternalConfigServiceService } from './external-config-service.service';

class MockAppConfigService {
  get = jest.fn();
}

describe('ExternalConfigServiceService', () => {
  let service: ExternalConfigServiceService;
  let appConfigService: MockAppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExternalConfigServiceService,
        {
          provide: AppConfigService,
          useClass: MockAppConfigService,
        },
      ],
    }).compile();

    service = module.get<ExternalConfigServiceService>(
      ExternalConfigServiceService,
    );
    appConfigService = module.get<MockAppConfigService>(AppConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTypeOrmOptions', () => {
    beforeEach(() => {
      appConfigService.get.mockReturnValue('value');
    });

    it('return TypeOrmModuleOptions', () => {
      expect(service.createTypeOrmOptions()).toStrictEqual({
        type: 'value',
        host: 'value',
        port: 'value',
        username: 'value',
        password: 'value',
        database: 'value',
        entities: expect.arrayContaining([
          expect.stringContaining(
            'src/commons/config/../../apis/**/*.entity.*',
          ),
        ]),
        synchronize: false,
        logging: true,
      });
    });
  });

  describe('createRedisClientOptions', () => {
    it('return RedisClientOptions', () => {
      expect(service.createRedisClientOptions()).toStrictEqual({
        store: redisStore,
        url: 'redis://my-redis:6379',
        isGlobal: true,
      });
    });
  });

  describe('createApolloDriverConfig', () => {
    it('return ApolloDriverConfig', () => {
      expect(JSON.stringify(service.createApolloDriverConfig())).toEqual(
        JSON.stringify({
          driver: ApolloDriver,
          autoSchemaFile: 'src/common/graphql/schema.gql',
          context: ({ req, res }) => ({ req, res }),
        }),
      );
    });
  });
});
