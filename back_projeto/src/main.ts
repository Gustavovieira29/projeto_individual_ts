import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Esta linha permite que o React se conecte
  await app.listen(3000);
}
bootstrap();