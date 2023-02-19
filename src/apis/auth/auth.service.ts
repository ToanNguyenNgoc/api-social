
import { HttpException, HttpStatus, Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ResponseUserDto } from '../users/dto/response-use.dto'
import { User, UserDocument } from '../users/schemas/user.schema';
import { LoginDto } from './dto/login-dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }
    async register(createUserDto: CreateUserDto): Promise<any> {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(createUserDto.password, salt)
            const createUser = await this.userModel.create({ ...createUserDto, password: hashed })
            return createUser;
        } catch (error) {
            let message = error.message
            if (error.keyPattern.email) message = 'Email belong to another account'
            if (error.keyPattern.telephone) message = 'Telephone belong to another account'
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: message
            }, HttpStatus.BAD_REQUEST)
        }
    }
    async login(login: LoginDto): Promise<ResponseUserDto> {
        const response: any = await this.userModel.findOne({ telephone: login.telephone })
        if (!response) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Telephone is not found'
            }, HttpStatus.NOT_FOUND)
        }
        const passwordMatched = await bcrypt.compare(login.password, response.password)
        if (!passwordMatched) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Password is wrong'
            }, HttpStatus.FORBIDDEN)
        }
        const { password, ...user } = response._doc
        return {
            ...user, token: await this.generateToken(
                response._id,
                response.role_id,
                response.fullname,
                response.avatar
            )
        }
    }
    async generateToken(
        id: Types.ObjectId,
        role_id: number,
        fullname: string,
        avatar: string
    ): Promise<string> {
        return this.jwtService.signAsync({ id: id, role_id: role_id, fullname: fullname, avatar: avatar }, {
            expiresIn: '10d',
            // secret: this.configService.get('JWT_SECRET_KEY')
            secret:'141'
        })
    }
    async profile(id: string): Promise<User> {
        try {
            const response: any = await this.userModel.findById(id)
            const { password, ...user } = response._doc
            return user
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'User not found',
            }, HttpStatus.NOT_FOUND, {
                cause: error
            });
        }
    }
}
