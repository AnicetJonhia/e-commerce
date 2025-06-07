import { Module } from '@nestjs/common';
import { CamundaService } from './camunda.service';

@Module({
  providers: [CamundaService],
  exports: [CamundaService],
})
export class CamundaModule {}