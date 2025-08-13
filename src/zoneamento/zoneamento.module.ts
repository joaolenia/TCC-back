import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZoneamentoService } from './zoneamento.service';
import { ZoneamentoController } from './zoneamento.controller';
import { Zoneamento } from './entities/Zonas.entity';
import { Cnaes } from 'src/cnaes/entities/Cnae.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Zoneamento, Cnaes])],
  controllers: [ZoneamentoController],
  providers: [ZoneamentoService],
  exports: [ZoneamentoService],
})
export class ZoneamentoModule {}
