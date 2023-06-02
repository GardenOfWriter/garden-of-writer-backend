import { ApolloDriver } from '@nestjs/apollo';
import { Test, TestingModule } from '@nestjs/testing';
import * as redisStore from 'cache-manager-redis-store';
import { AppConfigService } from '../app-config/app-config.service';
import { ExternalConfigService } from './external-config.service';

class MockAppConfigService {
  get = jest.fn();
}

describe('ExternalConfigService', () => {
  let service: ExternalConfigService;
  let appConfigService: MockAppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExternalConfigService,
        {
          provide: AppConfigService,
          useClass: MockAppConfigService,
        },
      ],
    }).compile();

    service = module.get<ExternalConfigService>(ExternalConfigService);
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

  describe('createCacheOptions', () => {
    it('return cacheOptions', () => {
      expect(service.createCacheOptions()).toStrictEqual({
        store: redisStore,
        url: 'redis://my-redis:6379',
        isGlobal: true,
      });
    });
  });

  describe('createGqlOptions', () => {
    it('return GqlOptions', () => {
      expect(JSON.stringify(service.createGqlOptions())).toEqual(
        JSON.stringify({
          driver: ApolloDriver,
          autoSchemaFile: 'src/common/graphql/schema.gql',
          context: ({ req, res }) => ({ req, res }),
        }),
      );
    });
  });
});
