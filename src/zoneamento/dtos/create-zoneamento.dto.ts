import {
  IsString,
  Length,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  ArrayUnique,
  IsInt,
} from 'class-validator';

export class CreateZoneamentoDto {
  @IsString()
  @Length(1, 100)
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsArray()
  @ArrayNotEmpty({ message: 'A lista de CNAEs permitidos não pode estar vazia' })
  @ArrayUnique({ message: 'IDs duplicados de CNAE não são permitidos' })
  @IsInt({ each: true, message: 'Cada CNAE deve ser um número inteiro (ID)' })
  cnaesPermitidosIds: number[];
}
