import { Document } from 'mongoose'
import { User } from '../users/schemas/user.schema'
import { Post } from '../posts/schemas'
export interface ResponseUserDoc extends Document {
    _doc: User
}
export interface ResponsePostDoc extends Document {
    _doc: Post
}