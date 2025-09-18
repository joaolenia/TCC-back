import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // permite requisições externas
  app.enableCors(); 

  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0'); // 0.0.0.0 = todas as interfaces
  console.log(`Aplicação rodando na porta ${port}`);
  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0'); 
  console.log(`Aplicação rodando na porta ${port}`);
}
bootstrap();