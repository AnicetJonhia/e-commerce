import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for the React frontend
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  // Use helmet for security headers
  app.use(helmet());

  // Use validation pipeline for DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Set up Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('E-Commerce API')
    .setDescription('The e-commerce API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Set global prefix
  app.setGlobalPrefix('api');

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();