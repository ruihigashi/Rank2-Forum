import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/entities/auth';
import { User } from 'src/entities/user.entity';
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
            umail: email,
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

    async updateUser(name: string, email:string, id: number, token: string, created_at?: string) {
        // 認証トークンの検証
        const now = new Date();
        const auth = await this.auhtRepository.findOne({
            where: {
                token: Equal(token),
                expire_at: MoreThan(now),
            }
        });
        if (!auth) {
            throw new ForbiddenException();
        }

        // 対象ユーザーを取得
        const user = await this.userRepository.findOne({ where: { id: Equal(id) } });
        if (!user) {
            throw new NotFoundException();
        }

        // 所有者か確認（auth.user_id と id が一致すること）
        if (auth.user_id !== id) {
            throw new ForbiddenException();
        }

        // 更新するフィールドを適用
        if (name) user.name = name;
        if (email) user.umail = email;
        if (created_at) {
            // created_at を文字列で受け取るため、Date に変換して代入
            const dt = new Date(created_at);
            if (!isNaN(dt.getTime())) {
                // @ts-ignore: created_at はエンティティで readonly になっていることがあるが、更新要求を受け入れる
                user.created_at = dt as any;
            }
        }

        const updated = await this.userRepository.save(user);

        // 返却時には hash を除外して返す
        // 浅いコピーを作成して hash を削除
        const safeUser: any = { ...updated };
        delete safeUser.hash;
        return safeUser;
    }
}
