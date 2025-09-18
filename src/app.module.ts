import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsultaPreviaModule } from './consulta-previa/consulta-previa.module';
import { CnaesModule } from './cnaes/cnaes.module';
import { ZoneamentoModule } from './zoneamento/zoneamento.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
  type: 'postgres',
  host: '172.17.0.2', 
  port: 5432,
  username: 'postgres',
  password: '123456', 
  database: 'consulta_previa_db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
}),
    ConsultaPreviaModule,
    CnaesModule,
    ZoneamentoModule,
    UsuarioModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
