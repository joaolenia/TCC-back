import { IsOptional, IsString, ValidateNested, IsArray } from "class-validator";
import { Type } from "class-transformer";
import { PerguntaClassificacaoRiscoDto } from "./pergunta-classificacao-risco.dto";

export class ClassificacaoRiscoDto {
  @IsOptional()
  @IsString()
  ds_tipo_risco?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PerguntaClassificacaoRiscoDto)
  pergunta_classificacao_risco?: PerguntaClassificacaoRiscoDto[];
}
