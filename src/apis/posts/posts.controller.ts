

import { Body, CacheInterceptor, Controller, Delete, Param, Query, Render, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Get, Post, Put } from '@nestjs/common'
import { CreatePostDto, QueryPostDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
    constructor(
        private readonly potsService: PostsService
    ) { }
    @Get()
    @UseInterceptors(CacheInterceptor)
    async getPosts(@Query() query: QueryPostDto): Promise<any> {
        return this.potsService.getPosts(query);
    }
    @Get(':id')
    async getPostById(@Param('id') id: string) {
        return this.potsService.getPostById(id)
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('jwt')
    @Post()
    async createPost(@Req() request: Request, @Body() body: CreatePostDto) {
        const user = request.user as any
        return this.potsService.createPost(user.id, body)
    }
    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('jwt')
    async updatePost(
        @Param('id') id: string,
        @Body() body: CreatePostDto,
        @Req() request: Request
    ) {
        const user = request.user as any
        return this.potsService.updatePost(user.id, id, body)
    }
    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('jwt')
    async deletePost(@Req() request: Request, @Param('id') id: string) {
        const user = request.user as any
        return this.potsService.deletePost(user.id, id)
    }
}
