import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService){}

    @Post()
    async createPost(
        @Body() createPostDto: CreatePostDto,
        @Query('token') token: string
    ) {
        return await this.postService.createPost(createPostDto.message, token)
    }

    @Get()
    async getList(
        @Query('token') token: string,
        @Query('page') page = 1,
        @Query('records') records = 10,
    ) {
        return await this.postService.getList(token, Number(page), Number(records))
    }

    @Delete()
    async deletePost(
        @Query('id') id: number,
        @Query('token') token: string,
    ) {
        return await this.postService.deletePost(id, token);
    }
}
