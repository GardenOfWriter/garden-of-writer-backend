import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { ExternalConfigServiceService } from './external-config-service.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ConfigService, AppConfigService, ExternalConfigServiceService],
  exports: [ConfigService, AppConfigService, ExternalConfigServiceService],
})
export class AppConfigModule {}
