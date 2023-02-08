import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger'

@ApiTags('media')
@Controller('file')
export class UploadController {
    constructor(
        private readonly fileService: UploadService,
    ) { }
    @ApiOkResponse({ description: 'Upload image' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiBearerAuth('jwt')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    @Post('image')
    async uploadFIleImg(@UploadedFile('file') file: Express.Multer.File) {
        return this.fileService.updateImage(file)
    }
}
