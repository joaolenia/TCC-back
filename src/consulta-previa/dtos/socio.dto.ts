import { IsString } from "class-validator";

export class SocioDto {
  @IsString()
  ds_nome: string;

  @IsString()
  nu_cpf_cnpj: string;

  @IsString()
  ds_nome_mae: string;
}
