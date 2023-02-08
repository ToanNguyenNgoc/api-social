import { UploadService } from './upload.service';
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { JwtStrategy } from '../middleware/strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { Media, MediaSchema } from './schemas/media.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]),
        JwtModule.register({}),
    ],
    controllers: [UploadController],
    providers: [UploadService, JwtStrategy],
})
export class UploadModule { }
