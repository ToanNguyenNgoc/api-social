import { Document } from 'mongoose'
import { User } from '../users/schemas/user.schema'
export interface ResponseUserDoc extends Document {
    _doc: User
}