export class CreateUserDto {
  readonly email: string;
  readonly telephone: string;
  readonly password: string;
  readonly fullname: string;
  readonly dob: string;
  readonly sex: boolean;
  readonly status: number;
  readonly deleted: number;
  readonly avatar: string;
  readonly role_id: number;
}
