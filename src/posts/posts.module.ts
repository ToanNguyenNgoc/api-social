/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema, } from './schemas';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
        JwtModule.register({}),
    ],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule { }
