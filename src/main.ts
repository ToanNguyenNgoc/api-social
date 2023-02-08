import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import moment from 'moment';
import dayjs from 'dayjs';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  const options = new DocumentBuilder()
    .setTitle('Api social')
    .setDescription('The social API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('media')
    .addTag('posts')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'jwt',
    )
    .build();
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Social API Docs',
  }
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document, customOptions);
  await app.listen(3000);
}
bootstrap();
