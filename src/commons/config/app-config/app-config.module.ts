import { Global, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from '@src/commons/config/app-config/app-config.service';
import Joi from 'joi';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string().required(),

        DATABASE_TYPE: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_SCHEMA: Joi.string().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_DATABASE: Joi.string().required(),

        CACHE_STORE_HOST: Joi.string().required(),
        CACHE_STORE_PORT: Joi.number().required(),

        JWT_ACCESS_KEY: Joi.string().required(),
        JWT_REFRESH_KEY: Joi.string().required(),

        EMAIL_SENDER: Joi.string().required(),
        EMAIL_PASS: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule implements OnApplicationBootstrap {
  constructor(private readonly appConfigService: AppConfigService) {}

  onApplicationBootstrap() {
    console.log(this.appConfigService.getAllMap());
  }
}
