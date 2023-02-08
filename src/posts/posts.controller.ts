

import { Body, Controller, Delete, Param, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Get, Post, Put } from '@nestjs/common'
import { CreatePostDto, ParamPostDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
    constructor(
        private readonly potsService: PostsService
    ) { }
    @Get()
    async getPosts(@Param() param: ParamPostDto): Promise<any> {
        return this.potsService.getPosts()
    }
    @Get(':id')
    async getPostById(@Param('id') id: string){
        return
    }
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('jwt')
    @Post()
    async createPost(@Req() request: Request, @Body() body: CreatePostDto) {
        const user = request.user as any
        return this.potsService.createPost(user.id, body)
    }
    @Put()
    async updatePost(): Promise<any> {
        return
    }
    @Delete(':id')
    async deletePost(@Param('id') id: string) {
        return
    }
}
