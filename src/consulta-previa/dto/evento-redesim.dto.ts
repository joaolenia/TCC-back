import { IsInt } from "class-validator";

export class EventoRedesimDto {
  @IsInt()
  co_evento: number;
}
