import { IsBoolean, IsString, IsEmpty } from 'class-validator'

export class UpdateUserDto {
    readonly email: string;
    readonly fullname: string;
    readonly dob: string;
    readonly sex: boolean;
    readonly avatar: string
}