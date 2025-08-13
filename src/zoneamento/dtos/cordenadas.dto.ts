import { IsObject, IsNotEmpty } from 'class-validator';

export class AtualizarCoordenadasDto {
  @IsObject()
  @IsNotEmpty()
  geometry: {
    type: string;
    coordinates: any[];
  };
}