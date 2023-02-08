import {IsString, IsNotEmpty} from 'class-validator'

export class LoginDto{
    @IsString()
    @IsNotEmpty()
    readonly telephone:string;
    @IsString()
    @IsNotEmpty()
    readonly password:string
}