import { CommentModule } from './apis/comments/comment.module';
import { ChatModule } from './events/chat/chat.module';
import { PostsModule } from './apis/posts/posts.module';
import { UploadModule } from './apis/upload-file/upload.module';
import { AuthModule } from './apis/auth/auth.module';
import { UserModule } from './apis/users/user.module';
import {  Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CloudinaryModule } from 'nestjs-cloudinary'
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    CommentModule,
    ChatModule,
    PostsModule,
    UploadModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI')
      })
    }),
    CloudinaryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        cloud_name: configService.get('CLOUND_NAME'),
        api_key: configService.get('CL_API_KEY'),
        api_secret: configService.get('CL_API_SECRET_KET'),
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
  ],
})
export class AppModule { }
