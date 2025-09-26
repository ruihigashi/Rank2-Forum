import { Module } from '@nestjs/common';
import { PostController } from './post.controller.js';
import { PostService } from './post.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MicroPost } from 'src/entities/microposts.js';
import { Auth } from 'src/entities/auth.js';

@Module({
  imports: [TypeOrmModule.forFeature([MicroPost, Auth])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
