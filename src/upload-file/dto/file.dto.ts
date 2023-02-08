import {IsNotEmpty} from 'class-validator'
import { Express } from 'express';

export class FileDto{
    @IsNotEmpty()
    file: Express.Multer.File
}