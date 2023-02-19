/*
https://docs.nestjs.com/modules
*/

import { CacheModule, Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema, } from './schemas';
import { JwtModule } from '@nestjs/jwt';
import {Comment, CommentSchema} from '../comments/schemas'

@Module({
    imports: [
        CacheModule.register({}),
        MongooseModule.forFeature([
            { name: Post.name, schema: PostSchema },
            {name:Comment.name, schema:CommentSchema}
        ]),
        JwtModule.register({}),
    ],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule { }
