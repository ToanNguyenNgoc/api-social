import { Document } from 'mongoose'
import { User } from '../apis/users/schemas/user.schema'
import { Post } from '../apis/posts/schemas'
export interface ResponseUserDoc extends Document {
    _doc: User
}
export interface ResponsePostDoc extends Document {
    _doc: Post
}