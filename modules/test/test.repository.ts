import { EntityRepository, Repository } from 'typeorm';
import { Test } from './test.model';

@EntityRepository(Test)
export class TestRepository extends Repository<Test> {

}