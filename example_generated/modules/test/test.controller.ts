import { Controller, Request, Param, Body, Get, Post, Put, Delete, ParseUUIDPipe } from "@nestjs/common";
import { TestService } from './test.service';
import { Test } from './test.model';


@Controller('/test')
export class TestController {

    public constructor(private readonly testService: TestService) {
    }

    @Get('/:id')
    public async getById(id: string): Promise<Test> {
        
        return await this.testService.getById(id);
        
    }

    @Post()
    public create(@Request() req, @Body() body: any): Promise<Test> {
        console.log('create', req.principal, body)
        
        let test: Test = new Test();
        Object.assign(test, body);
        return this.testService.create(req, test);
        
    }

    @Put('/:id')
    public async update(@Request() req, @Param('id', ParseUUIDPipe) id: string, @Body() body: any): Promise<Test> {
        console.log("update", body);
        
        let test: Test = await this.testService.getById(id);
        if (!test) {
            throw "Object test does not exist";
        } 
        Object.assign(test, body);
        return this.testService.update(req, test);
        
    }

    @Delete('/:id')
    public async remove(@Request() req, @Param('id', ParseUUIDPipe) id: string, @Body() body: any): Promise<Test> {
        console.log("remove", body);
        
        return this.testService.remove(req, id);
        
    }

    @Get()
    public async search(@Request() req): Promise<Array<Test>> {
        
        return await this.testService.search(req);
        
    }

}