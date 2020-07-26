import { EntityBase } from 'models/EntityBase';
import { Column, Entity, Index  } from 'typeorm';

@Entity('test')
export class Test extends EntityBase {

    constructor() {
        super();
    }

}