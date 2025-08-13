import { IsString, IsNotEmpty, IsArray, IsOptional, IsObject } from 'class-validator';

export class CreateZoneamentoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsArray()
  @IsNotEmpty()
  cnaesPermitidosIds: number[];

  @IsOptional()
  @IsObject()
  area?: {
    type: 'FeatureCollection';
    features: {
      type: 'Feature';
      geometry: {
        type: 'Polygon';
        coordinates: number[][][];
      };
    }[];
  };
}
