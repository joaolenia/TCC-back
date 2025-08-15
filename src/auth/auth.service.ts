import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from '../usuario/usuario.service';
import { LoginDto } from 'src/usuario/dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, senha: string) {
    const usuario = await this.usuarioService.findByEmailOrCpf(login);
    if (!usuario) throw new UnauthorizedException('Usuário ou senha inválidos');

    const senhaOk = await bcrypt.compare(senha, usuario.senha);
    if (!senhaOk) throw new UnauthorizedException('Usuário ou senha inválidos');

    return usuario;
  }

  async login(dto: LoginDto) {
    const usuario = await this.validateUser(dto.login, dto.senha);

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      role: usuario.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        email: usuario.email,
        cpf: usuario.cpf,
        role: usuario.role,
      },
    };
  }
}
