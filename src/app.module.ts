import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsultaPreviaModule } from './consulta-previa/consulta-previa.module';
import { CnaesModule } from './cnaes/cnaes.module';
import { ZoneamentoModule } from './zoneamento/zoneamento.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 5432,       
      username: 'postgres', 
      password: '1234567',   
      database: 'consulta_previa_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // só usar em dev
    }),
    ConsultaPreviaModule,
    CnaesModule,
    ZoneamentoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
