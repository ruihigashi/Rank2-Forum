import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    createUser(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string 
    ){
        this.userService.createUser(name, email, password);
    }

    @Get(':id')
    async getUser(@Param('id') id: number, @Query('token') token: string) {
        return await this.userService.getUser(token, id);
    }

    @Post('update')
    async updateUser(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('created_at') created_at: string,
        @Body('id') id: number,
        @Body('token') token: string,
    ) {
        return await this.userService.updateUser(name, email, id, token, created_at);
    }
}
