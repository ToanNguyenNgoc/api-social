import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({
    timestamps: true
})
export class Comment {
    @Prop()
    text: string;
    @Prop()
    type: string;
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    })
    user: Types.ObjectId;
    @Prop()
    commentable_id: string;
    @Prop([{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media'
    }])
    media: []
}
export const CommentSchema = SchemaFactory.createForClass(Comment);