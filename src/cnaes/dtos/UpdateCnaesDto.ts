import { IsString, Length } from 'class-validator';

export class UpdateCnaesDto {
  @IsString()
  @Length(1, 20)
  codigo: string;

  @IsString()
  @Length(1, 255)
  descricao: string;
}
