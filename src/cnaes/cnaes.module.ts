import { Module } from '@nestjs/common';
import { CnaesService } from './cnaes.service';
import { CnaesController } from './cnaes.controller';
import { Cnaes } from './entities/Cnae.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([ Cnaes])],
  controllers: [CnaesController],
  providers: [CnaesService],
})
export class CnaesModule {}
