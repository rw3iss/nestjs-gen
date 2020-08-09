import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { User } from './user.model';

@Module({
imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [
        UserService,
        UserRepository
    ],
    exports: []
})
export class UserModule {}