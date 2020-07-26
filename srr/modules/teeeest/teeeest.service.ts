import { Injectable, UnauthorizedException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeeeestRepository } from './teeeest.repository';
import { Teeeest } from './modeldirteeeest.model';

@Injectable()
export class TeeeestService {

    public constructor(@InjectRepository(TeeeestRepository) private teeeestRepository: TeeeestRepository) {
    }

    public async getById(id: string): Promise<Teeeest> {
        return await this.teeeestRepository.findOneOrFail({ id });
    }

    public create(@Request() req, teeeest: Teeeest): Promise<Teeeest> {
        console.log('create', teeeest)
        
        teeeest = this.teeeestRepository.create(teeeest);
        return this.teeeestRepository.save(teeeest);
        
    }

    public async update(@Request() req, teeeest: Teeeest): Promise<Teeeest> {
        console.log("update", teeeest);
        
        return this.teeeestRepository.save(teeeest);
        
    }

    public async remove(@Request() req, id: string) {
        let teeeest = await this.teeeestRepository.findOneOrFail({ id });
        if (!teeeest) {
            throw "Object teeeest does not exist";
        }
        
        await this.teeeestRepository.delete(id);
        return teeeest;
    }

    public async search(@Request() req): Promise<Array<Teeeest>> {
        
        return await this.teeeestRepository.find({
            
        });
    
    }

}
