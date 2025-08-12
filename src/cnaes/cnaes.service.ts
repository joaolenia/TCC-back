import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Cnaes } from './entities/Cnae.entity';
import { CreateCnaesDto } from './dtos/CreateCnaesDto';
import { UpdateCnaesDto } from './dtos/UpdateCnaesDto';

@Injectable()
export class CnaesService {
  constructor(
    @InjectRepository(Cnaes)
    private readonly cnaesRepository: Repository<Cnaes>,
  ) {}

  async create(createCnaesDto: CreateCnaesDto): Promise<Cnaes> {
    const codigoExistente = await this.cnaesRepository.findOne({
      where: { codigo: createCnaesDto.codigo },
    });
    if (codigoExistente) {
      throw new BadRequestException(`Já existe um CNAE com o código "${createCnaesDto.codigo}"`);
    }
    const descricaoExistente = await this.cnaesRepository.findOne({
      where: { descricao: createCnaesDto.descricao },
    });
    if (descricaoExistente) {
      throw new BadRequestException(`Já existe um CNAE com a descrição "${createCnaesDto.descricao}"`);
    }
    const cnae = this.cnaesRepository.create(createCnaesDto);
    return await this.cnaesRepository.save(cnae);
  }

  async updateById(id: number, updateCnaesDto: UpdateCnaesDto): Promise<Cnaes> {
    const cnae = await this.cnaesRepository.findOne({ where: { id } });
    if (!cnae) {
      throw new NotFoundException(`CNAE com ID ${id} não encontrado`);
    }
    if (updateCnaesDto.codigo && updateCnaesDto.codigo !== cnae.codigo) {
      const codigoExistente = await this.cnaesRepository.findOne({
        where: { codigo: updateCnaesDto.codigo, id: Not(id) },
      });
      if (codigoExistente) {
        throw new BadRequestException(`Já existe um CNAE com o código "${updateCnaesDto.codigo}"`);
      }
    }
    if (updateCnaesDto.descricao && updateCnaesDto.descricao !== cnae.descricao) {
      const descricaoExistente = await this.cnaesRepository.findOne({
        where: { descricao: updateCnaesDto.descricao, id: Not(id) },
      });
      if (descricaoExistente) {
        throw new BadRequestException(`Já existe um CNAE com a descrição "${updateCnaesDto.descricao}"`);
      }
    }

    Object.assign(cnae, updateCnaesDto);
    return await this.cnaesRepository.save(cnae);
  }

  async findById(id: number): Promise<Cnaes> {
    const cnae = await this.cnaesRepository.findOne({ where: { id } });
    if (!cnae) {
      throw new NotFoundException(`CNAE com ID ${id} não encontrado`);
    }
    return cnae;
  }

  async findAll(): Promise<Cnaes[]> {
    return await this.cnaesRepository.find();
  }

  async deleteById(id: number): Promise<void> {
    const result = await this.cnaesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`CNAE com ID ${id} não encontrado`);
    }
  }
}
