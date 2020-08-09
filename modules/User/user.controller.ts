import { Controller, Request, Param, Body, Get, Post, Put, Delete, ParseUUIDPipe } from "@nestjs/common";
import { UserService } from './user.service';
import { User } from './user.model';


@Controller('/User')
export class UserController {

    public constructor(private readonly UserService: UserService) {
    }

    @Get('/:id')
    public async getById(id: string): Promise<User> {
        
        return await this.UserService.getById(id);
        
    }

    @Post()
    public create(@Request() req, @Body() body: any): Promise<User> {
        console.log('create', req.principal, body)
        
        let user: User = new User();
        Object.assign(user, body);
        return this.UserService.create(req, user);
        
    }

    @Put('/:id')
    public async update(@Request() req, @Param('id', ParseUUIDPipe) id: string, @Body() body: any): Promise<User> {
        console.log("update", body);
        
        let user: User = await this.UserService.getById(id);
        if (!user) {
            throw "Object user does not exist";
        } 
        Object.assign(user, body);
        return this.UserService.update(req, user);
        
    }

    @Delete('/:id')
    public async remove(@Request() req, @Param('id', ParseUUIDPipe) id: string, @Body() body: any): Promise<User> {
        console.log("remove", body);
        
        return this.UserService.remove(req, id);
        
    }

    @Get()
    public async search(@Request() req): Promise<Array<User>> {
        
        return await this.UserService.search(req);
        
    }

}