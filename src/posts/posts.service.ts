/*
https://docs.nestjs.com/providers#services
*/

import { Body, Injectable } from '@nestjs/common';
import { PostDocument, Post } from './schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto } from './dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    ) { }
    async getPosts():Promise<Post[]>{
        const response = await this.postModel.find({}).populate(['user','media'])
        return response
    }
    async createPost(user_id: string, @Body() body: CreatePostDto): Promise<Post> {
        const response = await this.postModel.create({
            ...body,
            media:body.media_id,
            user: user_id
        })
        return response
    }
}
