import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtStrategy} from '../middleware/strategy'


@Module({
    imports: [
        JwtModule.register({}),
        MongooseModule.forFeature([{name:User.name, schema: UserSchema}])
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
