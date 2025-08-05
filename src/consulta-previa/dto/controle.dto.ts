import { IsInt, IsString } from 'class-validator';

export class ControleDto {
  @IsInt()
  nu_identificador_orgao: number;

  @IsString()
  ds_orgao: string;
}
