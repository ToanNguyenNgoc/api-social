/*
https://docs.nestjs.com/providers#services
*/

import { Body, HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { PostDocument, Post } from './schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDto, QueryPostDto } from './dto';
import { Pagination, ResponsePostDoc } from 'src/interfaces';
import { pickBy, identity } from 'lodash'

interface ResponsePosts extends Pagination {
    data: Post[]
}

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    ) { }
    async getPosts(@Query() query: QueryPostDto): Promise<ResponsePosts> {
        try {
            let include: string[]
        if (!query.include) { include = [] }
        if (query.include) {
            include = query.include.split('|')
        }
        const filterOptions = pickBy({
            deleted: '1',
            user: query.user_id,
            title: { $regex: `${query.keyword ?? ''}`, $options: 'i' }
        }, identity)
        const page = query.page ?? 1
        const limit = query.limit ?? 15
        const response = await this.postModel
            .find(filterOptions)
            .populate(include)
            .populate('user', '-password')
            .sort({ createdAt: -1 })
            .skip((page * limit) - limit)
            .limit(limit)
        const count = await this.postModel.find(filterOptions).count()
        return {
            data: response,
            current_page: parseInt(`${page}`),
            per_page: parseInt(`${limit}`),
            total: count,
            total_page: Math.ceil(count / limit)
        }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: error,
            }, HttpStatus.NOT_FOUND, {
                cause: error
            });
        }
    }
    async getPostById(id: string): Promise<Post> {
        try {
            const response = await this.postModel
                .findById(id)
                .populate('user', '-password')
                .populate(['media'])
            return response
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: `Not found Post with id:${id}`,
            }, HttpStatus.NOT_FOUND, {
                cause: error
            });
        }
    }
    async createPost(user_id: string, @Body() body: CreatePostDto): Promise<Post> {
        try {
            const response = await this.postModel.create({
                ...body,
                media: body.media,
                user: user_id
            })
            return response
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Media not found',
            }, HttpStatus.NOT_FOUND, {
                cause: error
            });
        }
    }
    async updatePost(user_id: string, id: string, body: CreatePostDto): Promise<Post> {
        const post: ResponsePostDoc = await this.postModel.findOne({ _id: id, user: user_id })
        await post.updateOne({ $set: body })
        return { ...post._doc, ...body }
    }
    async deletePost(user_id: string, id: string): Promise<{ message: string }> {
        try {
            const response = await this.postModel.findOne({ _id: id, user: user_id })
            await response.updateOne({ $set: { deleted: 0 } })
            return { message: `Delete Post success with id:${id}` }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: `Can not delete Post with id:${id}`,
            }, HttpStatus.NOT_FOUND, {});
        }
    }
}
