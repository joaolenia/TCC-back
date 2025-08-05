import { Module } from '@nestjs/common';
import { ConsultaPreviaService } from './consulta-previa.service';
import { ConsultaPreviaController } from './consulta-previa.controller';

@Module({
  controllers: [ConsultaPreviaController],
  providers: [ConsultaPreviaService],
})
export class ConsultaPreviaModule {}
