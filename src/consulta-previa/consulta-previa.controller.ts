import { Controller } from '@nestjs/common';
import { ConsultaPreviaService } from './consulta-previa.service';

@Controller('consulta-previa')
export class ConsultaPreviaController {
  constructor(private readonly consultaPreviaService: ConsultaPreviaService) {}
}
