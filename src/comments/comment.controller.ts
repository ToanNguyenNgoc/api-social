/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service'
import { CreateCommentDTO, QueryCommentDTO } from './dto';
import { Request } from 'express';
import { Comment } from './schemas'
import { Pagination } from 'src/interfaces'

interface ResponseComments extends Pagination {
    data: Comment[]
}

@ApiTags('comments')
@Controller('comments')
export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ) { }
    @Get()
    getComments(@Query() query: QueryCommentDTO): Promise<ResponseComments> {
        return this.commentService.get(query)
    }
    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('jwt')
    postComment(@Req() request: Request, @Body() body: CreateCommentDTO) {
        const user = request.user
        return this.commentService.create(body, user)
    }
}
