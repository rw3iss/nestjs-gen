import { Injectable, UnauthorizedException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.model';

@Injectable()
export class UserService {

    public constructor(@InjectRepository(UserRepository) private UserRepository: UserRepository) {
    }

    public async getById(id: string): Promise<User> {
        return await this.UserRepository.findOneOrFail({ id });
    }

    public create(@Request() req, user: User): Promise<User> {
        console.log('create', user)
        
        user = this.UserRepository.create(user);
        return this.UserRepository.save(user);
        
    }

    public async update(@Request() req, user: User): Promise<User> {
        console.log("update", user);
        
        return this.UserRepository.save(user);
        
    }

    public async remove(@Request() req, id: string) {
        let user = await this.UserRepository.findOneOrFail({ id });
        if (!user) {
            throw "Object user does not exist";
        }
        
        await this.UserRepository.delete(id);
        return user;
    }

    public async search(@Request() req): Promise<Array<User>> {
        
        return await this.UserRepository.find({
            
        });
    
    }

}