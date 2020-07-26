import { Controller, Request, Param, Body, Get, Post, Put, Delete, ParseUUIDPipe } from "@nestjs/common";
import { TeeeestService } from './teeeest.service';

import { Teeeest } from './modeldirteeeest.model';


@Controller('/teeeest')
export class TeeeestController {

    public constructor(private readonly teeeestService: TeeeestService) {
    }

    @Get('/:id')
    public async getById(id: string): Promise<Teeeest> {
        
        return await this.teeeestService.getById(id);
        
    }

    @Post()
    public create(@Request() req, @Body() body: any): Promise<Teeeest> {
        console.log('create', req.principal, body)
        
        let teeeest: Teeeest = new Teeeest();
        Object.assign(teeeest, body);
        return this.teeeestService.create(req, teeeest);
        
    }

    @Put('/:id')
    public async update(@Request() req, @Param('id', ParseUUIDPipe) id: string, @Body() body: any): Promise<Teeeest> {
        console.log("update", body);
        
        let teeeest: Teeeest = await this.teeeestService.getById(id);
        if (!teeeest) {
            throw "Object teeeest does not exist";
        } 
        Object.assign(teeeest, body);
        return this.teeeestService.update(req, teeeest);
        
    }

    @Delete('/:id')
    public async remove(@Request() req, @Param('id', ParseUUIDPipe) id: string, @Body() body: any): Promise<Teeeest> {
        console.log("remove", body);
        
        return this.teeeestService.remove(req, id);
        
    }

    @Get()
    public async search(@Request() req): Promise<Array<Teeeest>> {
        
        return await this.teeeestService.search(req);
        
    }

}