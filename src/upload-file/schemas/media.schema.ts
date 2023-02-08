import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MediaDocument = HydratedDocument<Media>

@Schema({
    timestamps: true
})
export class Media {
    @Prop()
    version: number;
    @Prop()
    width: number;
    @Prop()
    height: number;
    @Prop()
    format: string;
    @Prop()
    resource_type: string;
    @Prop()
    bytes: number;
    @Prop()
    media_url: string;
    @Prop()
    folder: string
}

export const MediaSchema = SchemaFactory.createForClass(Media)