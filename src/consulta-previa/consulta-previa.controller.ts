import { Controller, Post, Body, HttpCode, HttpStatus, Get, Param, UseGuards } from '@nestjs/common';
import { ConsultaPreviaService } from './consulta-previa.service';
import { CreateConsultaPreviaDto } from './dtos/create-consulta-previa.dto';
import { ConsultaPreviaResponseDto } from './dtos/Response.dto';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';


@Controller('v1/integracao/consultas-previas')
export class ConsultaPreviaController {
  constructor(private readonly consultaPreviaService: ConsultaPreviaService) { }


  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createConsultaPreviaDto: CreateConsultaPreviaDto): Promise<ConsultaPreviaResponseDto> {
    return this.consultaPreviaService.create(createConsultaPreviaDto);
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('resumo')
  async getResumo() {
    return this.consultaPreviaService.findAllResumo();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.consultaPreviaService.findById(id);
  }
}