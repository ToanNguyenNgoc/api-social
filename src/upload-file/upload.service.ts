/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable, UploadedFile } from '@nestjs/common';
import { CloudinaryService } from 'nestjs-cloudinary'

@Injectable()
export class UploadService {
    constructor(
        private readonly cloudinaryService: CloudinaryService
    ) { }
    async updateImage(@UploadedFile() file: Express.Multer.File): Promise<any> {
        const response = await this.cloudinaryService.uploadFile(
            file,
            {
                resource_type: 'image',
                folder: 'social_img'
            }
        )
        if (!response) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'An error upload image'
            }, HttpStatus.FORBIDDEN)
        }
        return response
    }
}
