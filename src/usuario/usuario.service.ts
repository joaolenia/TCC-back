import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dtos/usuario-create.dto';
import { UpdateUsuarioDto } from './dtos/usuario.update.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async create(dto: CreateUsuarioDto): Promise<Usuario> {
    const existeEmail = await this.usuarioRepo.findOne({ where: { email: dto.email } });
    if (existeEmail) throw new BadRequestException('Email já cadastrado');

    const existeCpf = await this.usuarioRepo.findOne({ where: { cpf: dto.cpf } });
    if (existeCpf) throw new BadRequestException('CPF já cadastrado');

    const senhaHash = await bcrypt.hash(dto.senha, 10);

    const usuario = this.usuarioRepo.create({
      ...dto,
      senha: senhaHash,
    });

    return this.usuarioRepo.save(usuario);
  }

  async update(id: number, dto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');

    if (dto.email) {
      const existe = await this.usuarioRepo.findOne({ where: { email: dto.email } });
      if (existe && existe.id !== id) throw new BadRequestException('Email já usado');
    }

    if (dto.cpf) {
      const existe = await this.usuarioRepo.findOne({ where: { cpf: dto.cpf } });
      if (existe && existe.id !== id) throw new BadRequestException('CPF já usado');
    }

    if (dto.senha) {
      dto.senha = await bcrypt.hash(dto.senha, 10);
    }

    Object.assign(usuario, dto);
    return this.usuarioRepo.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.usuarioRepo.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    await this.usuarioRepo.remove(usuario);
  }

  async login(dto: LoginDto): Promise<Usuario> {
    const usuario = await this.usuarioRepo.findOne({
      where: [
        { email: dto.login },
        { cpf: dto.login },
      ],
    });

    if (!usuario) throw new UnauthorizedException('Usuário ou senha inválidos');

    const senhaCorreta = await bcrypt.compare(dto.senha, usuario.senha);
    if (!senhaCorreta) throw new UnauthorizedException('Usuário ou senha inválidos');

    return usuario; 
  }

  async findByEmailOrCpf(login: string) {
  return this.usuarioRepo.findOne({
    where: [{ email: login }, { cpf: login }],
  });
}

}
