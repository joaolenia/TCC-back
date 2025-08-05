import { IsBoolean, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { AtividadeDto } from "./atividade.dto";

export class AtividadeEspecializadaDto {
  @IsString()
  co_cnae_especializada: string;

  @IsBoolean()
  is_atividade_principal: boolean;

  @IsBoolean()
  is_exerce_no_endereco: boolean;

  @ValidateNested()
  @Type(() => AtividadeDto)
  atividade: AtividadeDto;
}
