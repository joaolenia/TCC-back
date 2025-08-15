import { IsEmail, IsNotEmpty, Length, Matches, IsOptional, IsIn } from 'class-validator';
import { UserRole } from '../entities/usuario.entity';

export class CreateUsuarioDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {
    message: 'CPF inválido (use formato 000.000.000-00)',
  })
  cpf: string;

  @IsNotEmpty()
  @Length(6, 100)
  senha: string;

  @IsOptional()
  @IsIn(['ADMIN', 'PADRAO'])
  role?: UserRole;
}
