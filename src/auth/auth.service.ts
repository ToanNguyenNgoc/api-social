
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
        private readonly configService:ConfigService
    ) { }
    async register(createUserDto: CreateUserDto): Promise<any> {
        const userOld = await this.userModel.findOne({ telephone: createUserDto.telephone })
        if (userOld) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'The telephone has already been taken'
            }, HttpStatus.BAD_REQUEST)
        }
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(createUserDto.password, salt)
        const createUser = await this.userModel.create({ ...createUserDto, password: hashed })
        return createUser;
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
        return { ...user, token: await this.generateToken(response._id, response.role_id) }
    }
    async generateToken(id: Types.ObjectId, role_id: number): Promise<string> {
        return this.jwtService.signAsync({ id: id, role_id: role_id }, {
            expiresIn: '10d',
            secret: this.configService.get('JWT_SECRET_KEY')
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
