import { Module } from '@nestjs/common';
import { ExternalConfigService } from './external-config.service';

@Module({
  providers: [ExternalConfigService],
  exports: [ExternalConfigService],
})
export class ExternalConfigModule {}
