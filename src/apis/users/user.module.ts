import { UserController } from './user.controller';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service'
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../middleware/strategy';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({}),
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService,
        AuthService,
        JwtStrategy
    ],
})
export class UserModule { }
