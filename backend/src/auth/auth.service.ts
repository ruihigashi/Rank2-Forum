import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/entities/auth';
import { User } from 'src/entities/user.entity';
import { Equal, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    // コンストラクタでリポジトリを注入
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Auth)
        private authRepository: Repository<Auth>,
    ) { }

    async getAuth(name: string, password: string) {
        // name, passwordからUserレコード検索
        if (!password) {
            throw new UnauthorizedException(); // パスワードが指定されていない場合は認証失敗
        }
        // まずメールアドレスでユーザーを検索する
        const user = await this.userRepository.findOne({ where: { umail: Equal(name) } });

        // ユーザーが見つからなければ認証失敗
        if (!user) {
            throw new UnauthorizedException();
        }

        // bcrypt.compareで見つかったユーザーのハッシュとパスワードを比較
        const isMatch = await bcrypt.compare(password, user.hash);

        // パスワードが一致しなければ認証失敗
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        
        const ret = {
            token: '',
            user_id: user.id,
        }

        // 既存の認証レコードを検索
        var expire = new Date(); // このコードが実行された瞬間の現在の日時を保持
        expire.setDate(expire.getDate() + 1); // 「今日の日付の24時間後」を保持
        const auth = await this.authRepository.findOne({
            where: {
                user_id: Equal(user.id)
            },
        });
        if (auth) {
            // 既存レコードがあれば更新
            auth.expire_at = expire;
            await this.authRepository.save(auth);
            ret.token = auth.token;
        } else {
            // 既存レコードがなければ新規作成
            const token = crypto.randomUUID();
            const record = {
                user_id: user.id,
                token: token,
                expire_at: expire,
            };
            await this.authRepository.save(record);
            ret.token = token;
        }
        
        // 結果返却
        return ret;
    }
}
