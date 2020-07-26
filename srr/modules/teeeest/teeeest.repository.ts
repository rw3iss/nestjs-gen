import { EntityRepository, Repository } from 'typeorm';
import { Teeeest } from './modeldir>teeeest.model';

@EntityRepository(Teeeest)
export class TeeeestRepository extends Repository<Teeeest> {

}
