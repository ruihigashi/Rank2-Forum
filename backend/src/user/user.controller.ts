import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get('ping')
    ping() {
        return { ok: true };
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto){
        this.userService.createUser(createUserDto.name, createUserDto.email, createUserDto.password);
    }

    @Get(':id')
    async getUser(@Param('id') id: number, @Query('token') token: string) {
        return await this.userService.getUser(token, id);
    }

    @Post('update')
    async updateUser(@Body() updateUserDto: UpdateUserDto) {
        console.log('[UserController] updateUser called:', { name: updateUserDto.name, email: updateUserDto.email, created_at: updateUserDto.created_at, id: updateUserDto.id });
        return await this.userService.updateUser(updateUserDto.name, updateUserDto.email, updateUserDto.id, updateUserDto.token);
    }
}
