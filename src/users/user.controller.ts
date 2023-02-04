/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get('users')
    async findAll(): Promise<any[]> {
        return this.userService.findAll()
    }
    @Post('users')
    async create(@Body() userData: CreateUserDto) {
        return this.userService.create(userData)
    }
}
