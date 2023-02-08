import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express'
import { ApiTags} from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto)
    }
    @Post('/login')
    async login(@Body() login: LoginDto) {
        return this.authService.login(login)
    }
    // @UseGuards(AuthGuard('jwt'))
    // @Get('/profile')
    // async profile(@Req() request: Request) {
    //     const user = request.user as any
    //     return this.authService.profile(user.id)
    // }
}
