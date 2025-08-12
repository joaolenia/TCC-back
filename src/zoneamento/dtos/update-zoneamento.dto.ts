import { PartialType } from '@nestjs/mapped-types';
import { CreateZoneamentoDto } from './create-zoneamento.dto';

export class UpdateZoneamentoDto extends PartialType(CreateZoneamentoDto) {}
