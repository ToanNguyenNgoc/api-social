import { UserModule } from './users/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://toan06011998:toan06011998@cluster0.tqkjif5.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (config: ConfigService) => ({
    //     uri: config.get<string>('MONGODB_URI')
    //   })
    // }),
    UserModule
  ],
})
export class AppModule { }
