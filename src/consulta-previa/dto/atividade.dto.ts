import {
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray
} from 'class-validator';
import { Type } from 'class-transformer';
import { AtividadeEspecializadaDto } from './atividade-especializada.dto';

export class AtividadeDto {
  @IsString()
  co_cnae: string;

  @IsBoolean()
  is_atividade_principal: boolean;

  @IsOptional()
  @IsBoolean()
  is_exerce_no_endereco?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AtividadeEspecializadaDto)
  atividades_especializadas?: AtividadeEspecializadaDto[];
}
