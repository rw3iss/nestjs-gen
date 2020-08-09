
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {

    constructor() {
        super();
    }
    
    @Column()
    test: test;
    

}