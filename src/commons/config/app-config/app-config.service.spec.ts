import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from './app-config.service';

class MockConfigService {
  get = jest.fn();
}

describe('AppConfigService', () => {
  let service: AppConfigService;
  let mockConfigService: MockConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppConfigService,
        {
          provide: ConfigService,
          useClass: MockConfigService,
        },
      ],
    }).compile();

    service = module.get<AppConfigService>(AppConfigService);
    mockConfigService = module.get<MockConfigService>(ConfigService);
  });

  describe('get', () => {
    it('값 반환', () => {
      mockConfigService.get.mockReturnValue('value');

      expect(service.get('key' as any)).toBeDefined();
    });

    it('undefined 반환 return type 에 undefined 가 없지만 나올 수 있는 경우가 있음', () => {
      mockConfigService.get.mockReturnValue(undefined);

      expect(service.get('key' as any)).toBeUndefined();
    });
  });

  describe('getList', () => {
    it('1개의 key 로 요청했을 때', () => {
      mockConfigService.get.mockReturnValueOnce('value1');

      expect(service.getList('key1' as any)).toStrictEqual(['value1']);
    });

    it('2개의 key 로 요청했을 때', () => {
      mockConfigService.get.mockReturnValueOnce('value1');
      mockConfigService.get.mockReturnValueOnce('value2');

      expect(service.getList('key1' as any, 'key2' as any)).toStrictEqual([
        'value1',
        'value2',
      ]);
    });

    it('3개의 key 로 요청했을 때', () => {
      mockConfigService.get.mockReturnValueOnce('value1');
      mockConfigService.get.mockReturnValueOnce('value2');
      mockConfigService.get.mockReturnValueOnce('value3');

      expect(
        service.getList('key1' as any, 'key2' as any, 'key3' as any),
      ).toStrictEqual(['value1', 'value2', 'value3']);
    });
  });

  describe('getAll', () => {
    it('모든 env 키가 존재할 때', () => {
      mockConfigService.get.mockReturnValue('value');

      expect(service.getAll()).not.toContain(undefined);
    });

    it('존재하지 않는 env 가 있을 때', () => {
      mockConfigService.get.mockReturnValueOnce(undefined);
      mockConfigService.get.mockReturnValue('value');

      expect(service.getAll()).toContain(undefined);
    });
  });

  describe('getAllMap', () => {
    it('모든 env 키가 존재할 때', () => {
      mockConfigService.get.mockReturnValue('value');

      expect(Object.values(service.getAllMap()).every((el) => el)).toBe(true);
    });

    it('존재하지 않는 env 가 있을 때', () => {
      mockConfigService.get.mockReturnValueOnce(undefined);
      mockConfigService.get.mockReturnValue('value');

      expect(Object.values(service.getAllMap()).every((el) => el)).toBe(false);
    });
  });

  describe('isLocal', () => {
    it('NODE_ENV 가 없을 때', () => {
      mockConfigService.get.mockReturnValue(undefined);

      expect(service.isLocal()).toBe(false);
    });

    it('local 환경이 아닐 때', () => {
      mockConfigService.get.mockReturnValue('production');

      expect(service.isLocal()).toBe(false);
    });

    it('local 환경일 때', () => {
      mockConfigService.get.mockReturnValue('local');

      expect(service.isLocal()).toBe(true);
    });
  });

  describe('isDevelopment', () => {
    it('NODE_ENV 가 없을 때', () => {
      mockConfigService.get.mockReturnValue(undefined);

      expect(service.isDevelopment()).toBe(false);
    });

    it('development 환경이 아닐 때', () => {
      mockConfigService.get.mockReturnValue('local');

      expect(service.isDevelopment()).toBe(false);
    });

    it('development 환경일 때', () => {
      mockConfigService.get.mockReturnValue('development');

      expect(service.isDevelopment()).toBe(true);
    });
  });

  describe('isProduction', () => {
    it('NODE_ENV 가 없을 때', () => {
      mockConfigService.get.mockReturnValue(undefined);

      expect(service.isProduction()).toBe(false);
    });

    it('production 환경이 아닐 때', () => {
      mockConfigService.get.mockReturnValue('development');

      expect(service.isProduction()).toBe(false);
    });

    it('production 환경일 때', () => {
      mockConfigService.get.mockReturnValue('production');

      expect(service.isProduction()).toBe(true);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
