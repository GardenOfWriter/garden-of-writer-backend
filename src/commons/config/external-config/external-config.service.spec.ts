import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from '@src/commons/config/app-config/app-config.service';
import { ExternalConfigService } from '@src/commons/config/external-config/external-config.service';
import redisStore from 'cache-manager-redis-store';

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
          expect.stringContaining('dist/**/*.entity{.ts,.js}'),
        ]),
        synchronize: false,
        logging: true,
      });
    });
  });

  describe('createCacheOptions', () => {
    beforeEach(() => {
      appConfigService.get.mockReturnValueOnce('localhost');
      appConfigService.get.mockReturnValueOnce(6379);
    });

    it('return cacheOptions', () => {
      expect(service.createCacheOptions()).toStrictEqual({
        store: redisStore,
        host: 'localhost',
        port: 6379,
        isGlobal: true,
      });
    });
  });
});
