import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CnaesService } from './cnaes.service';
import { CreateCnaesDto } from './dtos/CreateCnaesDto';
import { UpdateCnaesDto } from './dtos/UpdateCnaesDto';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('v1/integracao/cnaes')
export class CnaesController {
  constructor(private readonly cnaesService: CnaesService) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  async create(@Body() createCnaesDto: CreateCnaesDto) {
    return await this.cnaesService.create(createCnaesDto);
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.cnaesService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.cnaesService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCnaesDto: UpdateCnaesDto,
  ) {
    return await this.cnaesService.updateById(id, updateCnaesDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return await this.cnaesService.deleteById(id);
  }
}
