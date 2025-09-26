import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Auth } from 'src/entities/auth.js';
import { User } from 'src/entities/user.entity.js';
import { Equal, MoreThan, Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Auth)
        private auhtRepository: Repository<Auth>,
    ) { }

    async createUser(name: string, email: string, password: string) {
        // ソルトラウンド数を指定します（10が一般的）
        const saltRounds = 10;

        // awaitを使用してパスワードのハッシュ化を非同期で行う
        const hash = await bcrypt.hash(password, saltRounds);

        const record = {
            name: name,
            email: email,
            hash: hash,
        }
        await this.userRepository.save(record);
    }

    async getUser(token: string, id: number) {
        // ログイン済みかチェック
        const now = new Date();
        const auth = await this.auhtRepository.findOne({
            where: {
                token: Equal(token),
                expire_at: MoreThan(now),
            }
        })
        if (!auth) {
            throw new ForbiddenException()
        }

        const user = await this.userRepository.findOne({
            where: {
                id: Equal(id),
            }
        })
        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }
}
