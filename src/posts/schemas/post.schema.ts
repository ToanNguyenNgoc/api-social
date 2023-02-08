import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

export type PostDocument = HydratedDocument<Post>;

@Schema({
    timestamps: true
})
export class Post {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    })
    user: Types.ObjectId;
    @Prop()
    title: string;
    @Prop()
    content: string;
    @Prop([{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media'
    }])
    media: [Types.ObjectId]
    @Prop({ default: 1 })
    deleted: number;
    @Prop({ default: true })
    status: boolean;
}
export const PostSchema = SchemaFactory.createForClass(Post);