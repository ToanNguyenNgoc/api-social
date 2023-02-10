/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Put, Query, Req, UseGuards } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport';
import { ChangePassUseDto, QueryUsersDto, UpdateUserDto } from './dto';
// UI Swagger
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @ApiBearerAuth('jwt')
    @UseGuards(AuthGuard('jwt'))
    @Get('/profile')
    async profile(@Req() request: Request): Promise<User> {
        const user = request.user as any
        return this.userService.profile(user.id)
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
    @Put('/changepassword')
    async changePassword(@Req() request: Request, @Body() body: ChangePassUseDto) {
        const user = request.user as any
        return this.userService.changePassword(user.id, body)
    }
    @Get('/')
    async getUsers(@Query() query: QueryUsersDto){
        return this.userService.getUsers(query)
    }

    @Get('/:id')
    async getUserById(@Param('id') id: string): Promise<any> {
        return this.userService.getUserById(id)
    }
}
