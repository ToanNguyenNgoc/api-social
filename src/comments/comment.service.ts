/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas';
import { CreateCommentDTO, QueryCommentDTO } from './dto';
import { Post, PostDocument } from '../posts/schemas';
import Promise from 'bluebird'
import { Pagination } from 'src/interfaces'

interface ResponseComments extends Pagination {
    data: Comment[]
}

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,
        @InjectModel(Post.name) private readonly postModel: Model<PostDocument>
    ) { }
    async create(body: CreateCommentDTO, user: any): Promise<Comment> {
        if (body.type === 'POST') {
            try {
                await this.postModel.findOne({ _id: body.commentable_id })
                const response: any = await this.commentModel.create({
                    ...body,
                    user: user.id,
                    media: body.media
                })
                return { ...response._doc, user: user }
            } catch (error) {
                throw new HttpException({
                    status: HttpStatus.FORBIDDEN,
                    error: error.message,
                }, HttpStatus.FORBIDDEN);
            }
        }
        if (body.type === 'REPLY') {
            const commentPar = await this.commentModel.findOne({ _id: body.commentable_id })
            if (!commentPar) {
                throw new HttpException({
                    status: HttpStatus.NOT_FOUND,
                    error: 'Not found comment parent',
                }, HttpStatus.NOT_FOUND);
            }
            const response: any = await this.commentModel.create({
                ...body,
                user: user.id,
                media: body.media
            })
            return { ...response._doc, user: user }
        }
    }
    async get(query: QueryCommentDTO): Promise<ResponseComments> {
        const filter = {type:'POST', commentable_id:query.commentable_id}
        const page = query.page ?? 1
        const limit = query.limit ?? 15
        const response = await this.commentModel
            .find(filter)
            .populate('user', '-password')
            .populate('media')
            .skip((page * limit) - limit)
            .limit(limit)
        const count = await this.commentModel.find(filter).count()
        const comments = await Promise.map(response, async (comment) => {
            const child = await this.commentModel.find({ commentable_id: comment._id, type: 'REPLY' })
            return { ...comment._doc, child: child }
        })
        return {
            data: comments,
            current_page: parseInt(`${page}`),
            per_page: parseInt(`${limit}`),
            total: count,
            total_page: Math.ceil(count / limit)
        }
    }
}
