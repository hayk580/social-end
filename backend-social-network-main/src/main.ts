import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RedisIoAdapter } from './modules/adapters/redis-io.adapters';

async function bootstrap() {

  try {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.useWebSocketAdapter(new RedisIoAdapter(app));
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    const config = new DocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addTag('cats')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(3001);
  } catch (e) {
    console.log('Error:', e);
  }
}
bootstrap();
