import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In } from 'typeorm';
import { Zoneamento } from './entities/Zonas.entity';
import { CreateZoneamentoDto } from './dtos/create-zoneamento.dto';
import { UpdateZoneamentoDto } from './dtos/update-zoneamento.dto';
import { Cnaes } from 'src/cnaes/entities/Cnae.entity';
@Injectable()
export class ZoneamentoService {
  constructor(
    @InjectRepository(Zoneamento)
    private readonly zoneamentoRepository: Repository<Zoneamento>,

    @InjectRepository(Cnaes)
    private readonly cnaesRepository: Repository<Cnaes>,
  ) {}

async create(createZoneamentoDto: CreateZoneamentoDto): Promise<Zoneamento> {
  const { nome, descricao, cnaesPermitidosIds } = createZoneamentoDto;

  if (!Array.isArray(cnaesPermitidosIds) || cnaesPermitidosIds.length === 0) {
    throw new BadRequestException('A lista de CNAEs permitidos deve ser um array não vazio');
  }

  // Verifica nome duplicado
  const nomeExistente = await this.zoneamentoRepository.findOne({ where: { nome } });
  if (nomeExistente) {
    throw new BadRequestException(`Já existe um Zoneamento com o nome "${nome}"`);
  }

  // Buscar CNAEs existentes
  const cnaesEncontrados = await this.cnaesRepository.find({
    where: { id: In(cnaesPermitidosIds) },
  });

  if (cnaesEncontrados.length !== cnaesPermitidosIds.length) {
    throw new BadRequestException('Alguns CNAEs informados não existem');
  }

  const zoneamento = this.zoneamentoRepository.create({
    nome,
    descricao,
    cnaesPermitidos: cnaesEncontrados,
  });

  return await this.zoneamentoRepository.save(zoneamento);
}


  async updateById(
    id: number,
    updateZoneamentoDto: UpdateZoneamentoDto,
  ): Promise<Zoneamento> {
    const zoneamento = await this.zoneamentoRepository.findOne({
      where: { id },
    });

    if (!zoneamento) {
      throw new NotFoundException(`Zoneamento com ID ${id} não encontrado`);
    }

    const { nome, descricao, cnaesPermitidosIds } = updateZoneamentoDto;

    if (nome && nome !== zoneamento.nome) {
      const nomeExistente = await this.zoneamentoRepository.findOne({
        where: { nome, id: Not(id) },
      });
      if (nomeExistente) {
        throw new BadRequestException(`Já existe um Zoneamento com o nome "${nome}"`);
      }
      zoneamento.nome = nome;
    }


    if (descricao) {
      zoneamento.descricao = descricao;
    }


    if (cnaesPermitidosIds) {
      const cnaesEncontrados = await this.cnaesRepository.find({
        where: { id: In(cnaesPermitidosIds) },
      });

      if (cnaesEncontrados.length !== cnaesPermitidosIds.length) {
        throw new BadRequestException('Alguns CNAEs informados não existem');
      }

      zoneamento.cnaesPermitidos = cnaesEncontrados;
    }

    return await this.zoneamentoRepository.save(zoneamento);
  }

  async findById(id: number): Promise<Zoneamento> {
    const zoneamento = await this.zoneamentoRepository.findOne({
      where: { id },
    });

    if (!zoneamento) {
      throw new NotFoundException(`Zoneamento com ID ${id} não encontrado`);
    }

    return zoneamento;
  }

  async findAll(): Promise<Zoneamento[]> {
    return await this.zoneamentoRepository.find();
  }

  async deleteById(id: number): Promise<void> {
    const result = await this.zoneamentoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Zoneamento com ID ${id} não encontrado`);
    }
  }


async atualizarCoordenadas(id: number, geometry: any): Promise<void> {
  const zoneamento = await this.zoneamentoRepository.findOne({ where: { id } });
  if (!zoneamento) {
    throw new NotFoundException(`Zoneamento com ID ${id} não encontrado`);
  }

  if (!geometry || !geometry.type || !geometry.coordinates) {
    throw new BadRequestException('Formato de coordenadas inválido. Esperado objeto GeoJSON geometry.');
  }

  const geo2D = this.removeZCoordinates(geometry);

  await this.zoneamentoRepository
    .createQueryBuilder()
    .update(Zoneamento)
    .set({
      area: () => `ST_GeomFromGeoJSON('${JSON.stringify(geo2D)}')`
    })
    .where("id = :id", { id })
    .execute();
}


private removeZCoordinates(geometry: any) {
  const coords = geometry.coordinates.map((ring: any) =>
    ring.map((coord: number[]) => [coord[0], coord[1]])
  );
  return { ...geometry, coordinates: coords };
}


}
