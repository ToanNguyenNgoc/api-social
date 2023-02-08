import { Types } from "mongoose";
import { CreateUserDto } from "./create-user.dto";

export class ResponseUserDto extends CreateUserDto{
    private readonly _id:Types.ObjectId;
    private readonly token:string
}