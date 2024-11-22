import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*', // Adjust to your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  const port = process.env.PORT || 3000; // Dynamic port assignment for deployment
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
