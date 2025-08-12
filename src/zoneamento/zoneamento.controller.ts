import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
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
