import { IsNotEmpty, IsString } from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'

export class ChangePassUseDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly oldPassword: string
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly newPassword: string
}