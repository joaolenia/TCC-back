import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ConsultaPreviaService } from './consulta-previa.service';
import { CreateConsultaPreviaDto } from './dtos/create-consulta-previa.dto';
import { ConsultaPrevia } from './entities/consulta-previa.entity';

@Controller('v1/integracao/consultas-previas')
export class ConsultaPreviaController {
  constructor(private readonly consultaPreviaService: ConsultaPreviaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createConsultaPreviaDto: CreateConsultaPreviaDto): Promise<ConsultaPrevia> {
    return this.consultaPreviaService.create(createConsultaPreviaDto);
  }
}