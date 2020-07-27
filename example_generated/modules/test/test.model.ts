import { EntityBase } from 'modules/auth/lib/EntityBase';
import { Entity } from 'typeorm';

@Entity('test')
export class Test extends EntityBase {

    constructor() {
        super();
    }

}