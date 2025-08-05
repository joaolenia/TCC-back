import { IsInt, IsString } from "class-validator";

export class PerguntaDto {
  @IsInt()
  co_pergunta: number;

  @IsString()
  ds_pergunta: string;

  @IsString()
  ds_resposta: string;
}
