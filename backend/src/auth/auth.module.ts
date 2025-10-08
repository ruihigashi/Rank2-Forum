import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/entities/auth';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auth, User])], //  このモジュール限定で、特定のテーブル（エンティティ）を操作する許可を申請する
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
