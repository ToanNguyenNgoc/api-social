import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  email: string;
  @Prop()
  telephone: string;
  @Prop()
  password: string;
  @Prop()
  fullname: string;
  @Prop()
  dob: string;
  @Prop()
  sex: boolean;
  @Prop()
  status: number;
  @Prop()
  deleted: number;
  @Prop()
  avatar: string;
  @Prop()
  role_id: number;
}
export const UserSchema = SchemaFactory.createForClass(User);
