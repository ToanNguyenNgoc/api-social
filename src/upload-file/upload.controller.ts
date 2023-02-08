import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('file')
export class UploadController {
    constructor(
        private readonly fileService: UploadService,
    ) { }
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    @Post('image')
    async uploadFIleImg(@UploadedFile() file: Express.Multer.File) {
        return this.fileService.updateImage(file)
    }
}
