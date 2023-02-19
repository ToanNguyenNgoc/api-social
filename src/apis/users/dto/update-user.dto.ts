import { IsBoolean, IsString, IsEmpty } from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'

export class UpdateUserDto {
    @ApiProperty()
    readonly email: string;
    @ApiProperty()
    readonly fullname: string;
    @ApiProperty()
    readonly dob: string;
    @ApiProperty()
    readonly sex: boolean;
    @ApiProperty()
    readonly avatar: string
}