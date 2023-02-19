import { IsNotEmpty, IsString, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreatePostDto {
    @IsString()
    @ApiProperty()
    readonly title: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly content: string;
    @ApiProperty()
    readonly media: []
}