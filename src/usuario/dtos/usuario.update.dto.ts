import { IsEmail, IsOptional, Length, Matches, IsIn } from 'class-validator';
import { UserRole } from '../entities/usuario.entity';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {
    message: 'CPF inválido (use formato 000.000.000-00)',
  })
  cpf?: string;

  @IsOptional()
  @Length(6, 100)
  senha?: string;

  @IsOptional()
  @IsIn(['ADMIN', 'PADRAO'])
  role?: UserRole;
}
