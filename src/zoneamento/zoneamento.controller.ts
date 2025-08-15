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
  ParseFloatPipe,
  UseGuards,
} from '@nestjs/common';
import { ZoneamentoService } from './zoneamento.service';
import { CreateZoneamentoDto } from './dtos/create-zoneamento.dto';
import { UpdateZoneamentoDto } from './dtos/update-zoneamento.dto';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';


@Controller('v1/integracao/zoneamentos')
export class ZoneamentoController {
  constructor(private readonly zoneamentoService: ZoneamentoService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  async create(@Body() createZoneamentoDto: CreateZoneamentoDto) {
    return await this.zoneamentoService.create(createZoneamentoDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('coord') 
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.zoneamentoService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.zoneamentoService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateZoneamentoDto: UpdateZoneamentoDto,
  ) {
    return await this.zoneamentoService.updateById(id, updateZoneamentoDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return await this.zoneamentoService.deleteById(id);
  }


}
