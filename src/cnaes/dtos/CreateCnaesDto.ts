import { IsString, Length } from 'class-validator';

export class CreateCnaesDto {
  @IsString()
  @Length(1, 20)
  codigo: string;

  @IsString()
  @Length(1, 255)
  descricao: string;
}
