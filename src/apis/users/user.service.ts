import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { ChangePassUseDto, QueryUsersDto, ResUserDto, UpdateUserDto } from './dto'
import { Pagination, ResponseUserDoc } from 'src/interfaces';
import * as bcrypt from 'bcrypt'
import { pickBy, identity } from 'lodash';
import { convertBoolean } from '../../functions';

export interface ResponseUsers extends Pagination {
    users: User[]
}


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) { }
    async getUsers(query: QueryUsersDto): Promise<ResponseUsers> {
        const page = parseInt(`${query.page ?? 1}`)
        const limit = parseInt(`${query.limit ?? 15}`)
        const filterOptions = pickBy(
            {
                fullname: { $regex: `${query.keyword ?? ''}`, $options: 'i' },
                sex: query.sex ? convertBoolean(query.sex) : '',
            }, identity
        )
        const response = await this.userModel
            .aggregate([
                { $match: filterOptions },
                { $match: query.sex ? { sex: convertBoolean(query.sex) } : {} },
                { $project: { password: 0 } },
                { $skip: ((page * limit) - limit) },
                { $limit: limit }
            ])
        const count = await this.userModel
            .find(filterOptions)
            .find(query.sex ? { sex: convertBoolean(query.sex) } : {})
            .count()
        return {
            users: response,
            current_page: parseInt(`${page}`),
            per_page: parseInt(`${limit}`),
            total: count,
            total_page: Math.ceil(count / limit)
        }
    }
    async getUserById(id: string): Promise<ResUserDto> {
        return
    }
    async updateUser(@Body() body: UpdateUserDto, user_id: string): Promise<ResUserDto> {
        try {
            const user: ResponseUserDoc = await this.userModel.findById(user_id)
            await user.updateOne({ $set: body })
            const { password, ...response } = user._doc
            return { ...response, ...body }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: error.message,
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
    async changePassword(user_id: string, @Body() body: ChangePassUseDto): Promise<{ message: string }> {
        const user = await this.userModel.findById(user_id)
        const passwordMatched = await bcrypt.compare(body.oldPassword, user.password)
        if (!passwordMatched) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'The old password is wrong'
            }, HttpStatus.FORBIDDEN)
        }
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(body.newPassword, salt)
        await user.updateOne({ $set: { password: hashed } })
        return { message: 'Change password success !' }
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
