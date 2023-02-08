import { UploadService } from './upload.service';
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { JwtStrategy } from '../middleware/strategy';

@Module({
    imports: [],
    controllers: [UploadController],
    providers: [UploadService, JwtStrategy],
})
export class UploadModule { }
