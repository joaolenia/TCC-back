import { ControleDto } from './controle.dto';
import { DadosConsultaPreviaDto } from './dados-consulta-previa.dto';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateConsultaPreviaDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ControleDto)
  controle: ControleDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DadosConsultaPreviaDto)
  dados_consulta_previa: DadosConsultaPreviaDto;
}
