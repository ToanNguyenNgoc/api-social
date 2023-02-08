/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport';
import { ChangePassUseDto, UpdateUserDto } from './dto';
// UI Swagger
import {ApiOkResponse, ApiTags, ApiBearerAuth} from '@nestjs/swagger'

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }
    @ApiOkResponse({description:'Get user profile'})
    @ApiBearerAuth('jwt')
    @UseGuards(AuthGuard('jwt'))
    @Get('/profile')
    async profile(@Req() request: Request): Promise<User> {
        const user = request.user as any
        return this.authService.profile(user.id)
    }
    @ApiBearerAuth('jwt')
    @UseGuards(AuthGuard('jwt'))
    @Put('/profile')
    async updateProfile(@Req() request: Request, @Body() updateUser: UpdateUserDto) {
        const user = request.user as any
        return this.userService.updateUser(updateUser, user.id)
    }
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('jwt')
    @Post('/changepassword')
    async changePassword(@Req() request: Request, @Body() body: ChangePassUseDto) {
        const user = request.user as any
        return this.userService.changePassword(user.id, body)
    }
}
