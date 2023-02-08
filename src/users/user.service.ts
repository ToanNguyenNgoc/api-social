import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { ChangePassUseDto, ResUserDto, UpdateUserDto } from './dto'
import { ResponseUserDoc } from 'src/interfaces';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) { }

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
}
