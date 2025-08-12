import { IsOptional, IsString } from "class-validator";

export class SolicitanteDto {

  @IsString()
  @IsOptional()
  nu_cpf: string;

  @IsString()
  @IsOptional()
  ds_nome: string;

  @IsString()
  @IsOptional()
  is_contador: boolean;

  @IsString()
  @IsOptional()
  nu_ddd_telefone: string;

  @IsString()
  @IsOptional()
  nu_telefone: string;

  @IsString()
  @IsOptional()
  nu_ramal: string;

  @IsString()
  @IsOptional()
  ds_email: string;
}
