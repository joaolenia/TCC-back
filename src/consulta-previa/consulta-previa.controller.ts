import { Controller, Post, Body, HttpCode, HttpStatus, Get, Param } from '@nestjs/common';
import { ConsultaPreviaService } from './consulta-previa.service';
import { CreateConsultaPreviaDto } from './dtos/create-consulta-previa.dto';
import { ConsultaPrevia } from './entities/consulta-previa.entity';
import { ConsultaPreviaResponseDto } from './dtos/Response.dto';

@Controller('v1/integracao/consultas-previas')
export class ConsultaPreviaController {
  constructor(private readonly consultaPreviaService: ConsultaPreviaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createConsultaPreviaDto: CreateConsultaPreviaDto): Promise<ConsultaPreviaResponseDto> {
    return this.consultaPreviaService.create(createConsultaPreviaDto);
  }

    @Get('resumo')
  async getResumo() {
    return this.consultaPreviaService.findAllResumo();
  }

  @Get(':id')
async getById(@Param('id') id: number) {
  return await this.consultaPreviaService.findById(id);
}
}