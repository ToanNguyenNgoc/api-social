import { IsNotEmpty, IsString } from 'class-validator'

export class ChangePassUseDto {
    @IsNotEmpty()
    @IsString()
    readonly oldPassword: string
    @IsNotEmpty()
    @IsString()
    readonly newPassword: string
}