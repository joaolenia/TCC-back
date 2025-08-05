import {
  IsString, IsBoolean, IsOptional, IsArray, ValidateNested, IsInt
} from 'class-validator';
import { Type } from 'class-transformer';
import { SolicitanteDto } from './solicitante.dto';
import { OpcaoNomeDto } from './opcao-nome.dto';
import { AtividadeDto } from './atividade.dto';
import { EventoRedesimDto } from './evento-redesim.dto';
import { SocioDto } from './socio.dto';
import { EnderecoDto } from './endereco.dto';
import { TipoUnidadeDto } from './tipo-unidade.dto';
import { FormaAtuacaoDto } from './forma-atuacao.dto';
import { UtilizacaoSoloDto } from './utilizacao-solo.dto';
import { PerguntaDto } from './pergunta.dto';
import { ClassificacaoRiscoDto } from './classificacao-risco.dto';

export class DadosConsultaPreviaDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  @IsOptional()
  co_protocolo_redesim: string;

  @IsString()
  @IsOptional()
  dt_solicitacao: string;

  @IsOptional()
  @IsString()
  nu_cnpj?: string;

  @IsOptional()
  @IsString()
  nu_cnpj_matriz?: string;

  @IsBoolean()
  is_atualizacao_receita: boolean;

  @ValidateNested()
  @Type(() => SolicitanteDto)
  solicitante: SolicitanteDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OpcaoNomeDto)
  opcoes_nome?: OpcaoNomeDto[];

  @IsString()
  ds_objeto_social: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AtividadeDto)
  atividades: AtividadeDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EventoRedesimDto)
  eventos: EventoRedesimDto[];

  @IsString()
  co_natureza_juridica: string;

  @IsInt()
  co_enquadramento: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocioDto)
  socios?: SocioDto[];

  @ValidateNested()
  @Type(() => EnderecoDto)
  endereco: EnderecoDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TipoUnidadeDto)
  tipo_unidade: TipoUnidadeDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FormaAtuacaoDto)
  formas_atuacao?: FormaAtuacaoDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => UtilizacaoSoloDto)
  utilizacao_solo?: UtilizacaoSoloDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PerguntaDto)
  questionario?: PerguntaDto[];

  @IsOptional()
  @IsString()
  nu_cnpj_entidade_registro?: string;

  @IsOptional()
  @IsString()
  nu_cnpj_entidade_registro_matriz?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ClassificacaoRiscoDto)
  classificacao_risco?: ClassificacaoRiscoDto;

  @IsOptional()
  @IsString()
  co_inscricao_municipal?: string;
}
