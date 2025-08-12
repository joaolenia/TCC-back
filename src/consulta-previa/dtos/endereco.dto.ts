import {
  IsInt, IsOptional, IsString, ValidateNested
} from "class-validator";
import { Type } from "class-transformer";
import { NaturezaImovelDto } from "./natureza-imovel.dto";
import { PointDto } from "./point.dto";

export class EnderecoDto {

  @IsOptional()
  @IsInt()
  co_uf: number;

  @IsString()
  co_cep: string;

  @IsOptional()
  @IsInt()
  co_tipo_imovel: number;

  @IsInt()
  co_tipo_logradouro: number;

  @IsString()
  ds_tipo_logradouro: string;

  @IsString()
  ds_endereco: string;

  @IsString()
  nu_numero: string;

  @IsString()
  ds_bairro: string;

  @IsOptional()
  @IsString()
  ds_complemento: string;

  @IsInt()
  co_municipio: number;

  @IsInt()
  co_municipio_tom: number;

  @IsOptional()
  @IsString()
  nu_area_total: string;

  @IsOptional()
  @IsString()
  nu_area_utilizada: string;

  @IsOptional()
  @IsString()
  ds_ponto_referencia: string;

  @ValidateNested()
  @Type(() => NaturezaImovelDto)
  natureza_imovel: NaturezaImovelDto;

  @ValidateNested()
  @Type(() => PointDto)
  coordenadas_geograficas: PointDto;
}
