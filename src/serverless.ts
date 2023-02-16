import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import serverlessExpress from '@vendia/serverless-express'
import { Callback, Context, Handler } from 'aws-lambda';

let server: Handler

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
    SwaggerModule.setup('swagger', app, document, customOptions);
    app.useStaticAssets(path.join(__dirname, 'assets/swagger-ui-dist/'), {
        prefix: '/swagger'
    });
    // await app.listen(3000);
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({ app: expressApp })
}
export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
    server = server ?? (await bootstrap())
    return server(event, context, callback)
}
