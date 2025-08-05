import { IsString } from "class-validator";

export class OpcaoNomeDto {
  @IsString()
  ds_opcao_nome: string;
}
