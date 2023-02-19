import { IsEmail, IsString, IsNotEmpty } from 'class-validator'
import {ApiProperty} from '@nestjs/swagger'

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly telephone: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly password: string;
  @ApiProperty()
  readonly fullname: string;
  @ApiProperty()
  readonly dob: string;
  @ApiProperty()
  readonly sex: boolean;
  readonly status: number;
  readonly deleted: number;
  @ApiProperty()
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
