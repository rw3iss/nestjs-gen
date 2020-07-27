import { Injectable, UnauthorizedException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestRepository } from './test.repository';
import { Test } from './test.model';

@Injectable()
export class TestService {

    public constructor(@InjectRepository(TestRepository) private testRepository: TestRepository) {
    }

    public async getById(id: string): Promise<Test> {
        return await this.testRepository.findOneOrFail({ id });
    }

    public create(@Request() req, test: Test): Promise<Test> {
        console.log('create', test)
        
        test = this.testRepository.create(test);
        return this.testRepository.save(test);
        
    }

    public async update(@Request() req, test: Test): Promise<Test> {
        console.log("update", test);
        
        return this.testRepository.save(test);
        
    }

    public async remove(@Request() req, id: string) {
        let test = await this.testRepository.findOneOrFail({ id });
        if (!test) {
            throw "Object test does not exist";
        }
        
        await this.testRepository.delete(id);
        return test;
    }

    public async search(@Request() req): Promise<Array<Test>> {
        
        return await this.testRepository.find({
            
        });
    
    }

}