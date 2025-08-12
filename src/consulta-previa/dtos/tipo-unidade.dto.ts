import { IsInt } from "class-validator";

export class TipoUnidadeDto {
  @IsInt()
  co_tipo_unidade: number;
}
