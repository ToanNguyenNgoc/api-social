import { IsEmail, IsString, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  readonly telephone: string;
  @IsNotEmpty()
  @IsString()
  readonly password: string;
  readonly fullname: string;
  readonly dob: string;
  readonly sex: boolean;
  readonly status: number;
  readonly deleted: number;
  readonly avatar: string;
  readonly role_id: number;
}
export class ResUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  readonly telephone: string;
  @IsNotEmpty()
  readonly fullname: string;
  readonly dob: string;
  readonly sex: boolean;
  readonly status: number;
  readonly deleted: number;
  readonly avatar: string;
  readonly role_id: number;
}
