import { UploadModule } from './upload-file/upload.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CloudinaryModule } from 'nestjs-cloudinary'

@Module({
  imports: [
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
  ],
})
export class AppModule { }
