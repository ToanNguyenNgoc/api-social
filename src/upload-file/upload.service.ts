/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable, UploadedFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'nestjs-cloudinary'
import { Media, MediaDocument } from './schemas';

@Injectable()
export class UploadService {
    constructor(
        @InjectModel(Media.name) private readonly mediaModel: Model<MediaDocument>,
        private readonly cloudinaryService: CloudinaryService
    ) { }
    async updateImage(@UploadedFile() file: Express.Multer.File): Promise<Media> {
        if (!file) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'File is not empty'
            }, HttpStatus.BAD_REQUEST)
        }
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
        try {
            const media = await this.mediaModel.create({
                version: response.version,
                width: response.width,
                height: response.height,
                format: response.format,
                resource_type: response.resource_type,
                bytes: response.bytes,
                media_url: response.url,
                folder: response.folder
            })
            return media
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'An error save image'
            }, HttpStatus.FORBIDDEN)
        }
    }
}
