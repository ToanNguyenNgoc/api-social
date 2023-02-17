import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true, unique: true })
  telephone: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: 'NO NAME' })
  fullname: string;
  @Prop()
  dob: string;
  @Prop()
  sex: boolean;
  @Prop({ default: 1 })
  status: number;
  @Prop({ default: 0 })
  deleted: number;
  @Prop()
  avatar: string;
  @Prop({ default: 1 })
  role_id: number;
  @Prop({ default: Date.now() })
  created_at: string
}
export const UserSchema = SchemaFactory.createForClass(User);
