import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schemas';
import { Post, PostSchema } from '../posts/schemas'
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Comment.name, schema: CommentSchema },
            { name: Post.name, schema: PostSchema }
        ]),
    ],
    controllers: [
        CommentController,],
    providers: [
        CommentService,],
})
export class CommentModule { }
