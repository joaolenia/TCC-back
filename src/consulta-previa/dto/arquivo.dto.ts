import { IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { UtilizacaoSoloDto } from "./utilizacao-solo.dto";

export class ArquivoDto {
  @IsOptional()
  @IsString()
  ds_url_servico: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UtilizacaoSoloDto)
  utilizacao_solo: UtilizacaoSoloDto;
}
