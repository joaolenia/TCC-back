import { IsString } from "class-validator";

export class PerguntaClassificacaoRiscoDto {
  @IsString()
  co_identificador_pergunta: string;

  @IsString()
  ds_pergunta: string;

  @IsString()
  ds_resposta: string;
}
