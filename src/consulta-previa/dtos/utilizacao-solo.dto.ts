import {
  IsInt,
  IsString,
  IsArray,
  ValidateNested,
  IsOptional
} from 'class-validator';
import { Type } from 'class-transformer';
import { ArquivoDto } from './arquivo.dto';

export class UtilizacaoSoloDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsInt()
  co_utilizacao_solo: number;

  @IsString()
  nu_autorizacao: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ArquivoDto)
  ds_arquivo?: ArquivoDto[];
}
