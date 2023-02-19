import {IsString, IsNotEmpty} from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'

export class LoginDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly telephone:string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly password:string
}