import { IsString } from "class-validator";

export class PointDto {
  @IsString()
  nu_latitude: string;

  @IsString()
  nu_longitude: string;
}
