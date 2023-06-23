import { Module } from '@nestjs/common';
import { ExternalConfigService } from '@src/commons/config/external-config/external-config.service';

@Module({
  providers: [ExternalConfigService],
  exports: [ExternalConfigService],
})
export class ExternalConfigModule {}
