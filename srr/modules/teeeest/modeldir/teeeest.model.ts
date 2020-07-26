import { EntityBase } from 'models/EntityBase';
import { Column, Entity, Index  } from 'typeorm';

@Entity('teeeest')
export class Teeeest extends EntityBase {

    constructor() {
        super();
    }

}