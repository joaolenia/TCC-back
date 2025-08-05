import { IsInt } from "class-validator";

export class FormaAtuacaoDto {
  @IsInt()
  co_forma_atuacao: number;
}
