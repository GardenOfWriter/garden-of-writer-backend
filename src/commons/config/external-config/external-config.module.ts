import { Module } from '@nestjs/common';
import { ExternalConfigServiceService } from './external-config-service.service';

@Module({
  providers: [ExternalConfigServiceService],
  exports: [ExternalConfigServiceService],
})
export class ExternalConfigModule {}
