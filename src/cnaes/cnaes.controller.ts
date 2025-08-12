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
import { CnaesService } from './cnaes.service';
import { CreateCnaesDto } from './dtos/CreateCnaesDto';
import { UpdateCnaesDto } from './dtos/UpdateCnaesDto';

@Controller('v1/integracao/cnaes')
export class CnaesController {
  constructor(private readonly cnaesService: CnaesService) {}

  @Post()
  async create(@Body() createCnaesDto: CreateCnaesDto) {
    return await this.cnaesService.create(createCnaesDto);
  }

  @Get()
  async findAll() {
    return await this.cnaesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.cnaesService.findById(id);
  }

  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCnaesDto: UpdateCnaesDto,
  ) {
    return await this.cnaesService.updateById(id, updateCnaesDto);
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return await this.cnaesService.deleteById(id);
  }
}
