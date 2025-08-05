import { IsString } from "class-validator";

export class NaturezaImovelDto {
  @IsString()
  co_tipo_natureza: string;

  @IsString()
  nu_inscricao: string;
}
