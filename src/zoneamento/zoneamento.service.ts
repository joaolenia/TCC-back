import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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
  ) { }

  async create(dto: CreateZoneamentoDto): Promise<Zoneamento> {
    const { nome, descricao, cnaesPermitidosIds, area } = dto;

    if (!Array.isArray(cnaesPermitidosIds) || cnaesPermitidosIds.length === 0) {
      throw new BadRequestException('A lista de CNAEs permitidos deve ser um array não vazio');
    }

    // Busca por zoneamento com mesmo nome e descrição
    const mesmoNomeDescricao = await this.zoneamentoRepository.findOne({
      where: { nome, descricao },
    });

    if (mesmoNomeDescricao) {
      throw new BadRequestException(
        `Já existe um Zoneamento com o nome "${nome}" e a descrição "${descricao}"`
      );
    }

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

    if (area) {
      zoneamento.area = this.validateGeoJSON(area);
    }

    return await this.zoneamentoRepository.save(zoneamento);
  }


  async updateById(id: number, dto: UpdateZoneamentoDto): Promise<Zoneamento> {
    const zoneamento = await this.zoneamentoRepository.findOne({ where: { id } });
    if (!zoneamento) throw new NotFoundException(`Zoneamento com ID ${id} não encontrado`);

    if (dto.nome && dto.nome !== zoneamento.nome) {
      const existe = await this.zoneamentoRepository.findOne({ where: { nome: dto.nome, id: Not(id) } });
      if (existe) throw new BadRequestException(`Já existe um Zoneamento com o nome "${dto.nome}"`);
      zoneamento.nome = dto.nome;
    }

    if (dto.descricao) zoneamento.descricao = dto.descricao;

    if (dto.cnaesPermitidosIds) {
      const cnaesEncontrados = await this.cnaesRepository.find({ where: { id: In(dto.cnaesPermitidosIds) } });
      if (cnaesEncontrados.length !== dto.cnaesPermitidosIds.length)
        throw new BadRequestException('Alguns CNAEs informados não existem');
      zoneamento.cnaesPermitidos = cnaesEncontrados;
    }

    if (dto.area) {
      zoneamento.area = this.validateGeoJSON(dto.area);
    }

    return await this.zoneamentoRepository.save(zoneamento);
  }

  async findById(id: number): Promise<Zoneamento> {
    const zoneamento = await this.zoneamentoRepository.findOne({ where: { id } });
    if (!zoneamento) throw new NotFoundException(`Zoneamento com ID ${id} não encontrado`);
    return zoneamento;
  }

  async findAll(): Promise<Zoneamento[]> {
    return await this.zoneamentoRepository.find();
  }

  async deleteById(id: number): Promise<void> {
    const result = await this.zoneamentoRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Zoneamento com ID ${id} não encontrado`);
  }

  private validateGeoJSON(area: any): object {
    if (!area.features || area.features.length === 0) {
      throw new BadRequestException('GeoJSON deve conter ao menos um polígono');
    }

    const feature = area.features[0];
    if (!feature.geometry || feature.geometry.type !== 'Polygon') {
      throw new BadRequestException('GeoJSON deve conter um polígono válido');
    }

    // Limpa a terceira coordenada se existir
    const cleanedCoordinates = feature.geometry.coordinates.map((ring: number[][]) =>
      ring.map(coord => [coord[0], coord[1]])
    );

    return {
      type: 'Polygon',
      coordinates: cleanedCoordinates,
    };
  }

  async findZoneByCoordinate(lon: number, lat: number): Promise<Zoneamento | null> {
    return await this.zoneamentoRepository
      .createQueryBuilder('z')
      .leftJoinAndSelect('z.cnaesPermitidos', 'c')
      .where(
        'ST_Contains(z.area, ST_SetSRID(ST_MakePoint(:lon, :lat), 4326))',
        { lon, lat }
      )
      .getOne();
  }

}
