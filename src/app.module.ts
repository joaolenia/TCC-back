import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsultaPreviaModule } from './consulta-previa/consulta-previa.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234567',
      database: 'consulta_previa_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    // Adicione o ConsultaPreviaModule aqui
    ConsultaPreviaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}