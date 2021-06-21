import { Injectable, UnauthorizedException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestRepository } from './test.repository';
import { Test } from './test.model';

@Injectable()
export class TestService {

    public constructor(@InjectRepository(TestRepository) private testRepository: TestRepository) {
    }

    public async getById(id: number): Promise<Test> {
        return await this.testRepository.findOne({ id });
    }

    public create(@Request() req, test: Test): Promise<Test> {
        test = this.testRepository.create(test);
        return this.testRepository.save(test);
    }

    public async update(@Request() req, test: Test): Promise<Test> {
        return this.testRepository.save(test);
    }

    public async remove(@Request() req, id: number) {
        let test = await this.testRepository.findOne({ id });
        await this.testRepository.delete(id);
        return test;
    }

    public async search(@Request() req): Promise<Array<Test>> {
        return await this.testRepository.find({});
    }

}