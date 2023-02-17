import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  const options = new DocumentBuilder()
    .setTitle('Api social')
    .setDescription('The social API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('media')
    .addTag('posts')
    .addTag('comments')
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
  app.useStaticAssets(path.join(__dirname, 'assets/swagger-ui-dist/'), {
    prefix: '/swagger'
  });
  await app.listen(3003);
}
bootstrap();
