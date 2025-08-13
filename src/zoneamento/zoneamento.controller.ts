import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  BadRequestException,
  ParseFloatPipe,
} from '@nestjs/common';
import { ZoneamentoService } from './zoneamento.service';
import { CreateZoneamentoDto } from './dtos/create-zoneamento.dto';
import { UpdateZoneamentoDto } from './dtos/update-zoneamento.dto';

@Controller('v1/integracao/zoneamentos')
export class ZoneamentoController {
  constructor(private readonly zoneamentoService: ZoneamentoService) {}

  @Post()
  async create(@Body() createZoneamentoDto: CreateZoneamentoDto) {
    return await this.zoneamentoService.create(createZoneamentoDto);
  }
    @Get('coord') // Coloque antes de ':id'
  async findZoneByCoordinate(
    @Query('lon', ParseFloatPipe) lon: number,
    @Query('lat', ParseFloatPipe) lat: number,
  ) {
    const zoneamento = await this.zoneamentoService.findZoneByCoordinate(lon, lat);
    if (!zoneamento) {
      return { message: 'Nenhuma zona encontrada para essas coordenadas' };
    }
    return zoneamento;
  }

  @Get()
  async findAll() {
    return await this.zoneamentoService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.zoneamentoService.findById(id);
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateZoneamentoDto: UpdateZoneamentoDto,
  ) {
    return await this.zoneamentoService.updateById(id, updateZoneamentoDto);
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return await this.zoneamentoService.deleteById(id);
  }


}
