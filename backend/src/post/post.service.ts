import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/entities/auth';
import { MicroPost } from 'src/entities/microposts';
import { Equal, MoreThan, Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(MicroPost)
        private microPostsRepository: Repository<MicroPost>,
        @InjectRepository(Auth)
        private authRepository: Repository<Auth>
    ) { }

    async createPost(message: string, token: string) {
        // ログイン済みかチェック
        const now = new Date();
        const auth = await this.authRepository.findOne({
            where: {
                token: Equal(token),
                expire_at: MoreThan(now),
            }
        })
        if (!auth) {
            throw new ForbiddenException()
        }

        const record = {
            user_id: auth.user_id,
            content: message,
        }
        await this.microPostsRepository.save(record);
    }

    async getList(token: string, page: number = 1, records: number = 10) {
        // ログイン済みかチェック
        const now = new Date();
        const auth = await this.authRepository.findOne({
            where: {
                token: Equal(token),
                expire_at: MoreThan(now),
            }
        });

        if (!auth) {
            throw new ForbiddenException();
        }

        // ページング計算
        const offset = (page - 1) * records;

        // 投稿取得クエリ
        const qb = this.microPostsRepository
            .createQueryBuilder('micro_post')
            .leftJoinAndSelect('user', 'user', 'user.id = micro_post.user_id')
            .select([
                'micro_post.id as id',
                'user.name as user_name',
                'micro_post.content as content',
                'micro_post.created_at as created_at',
            ])
            .orderBy('micro_post.created_at', 'DESC')
            .offset(offset)
            .limit(records);

        type ResultType = {
            id: number;
            content: string;
            user_name: string;
            created_at: Date;
        };

        const posts = await qb.getRawMany<ResultType>();
        const total = await this.microPostsRepository.count();

        return {
            posts,
            total,
            page,
            totalPages: Math.ceil(total / records),
        };
    }


    // 指定された投稿IDを削除する
    async deletePost(id: number, token: string) {
        // 認証チェック
        const now = new Date();
        const auth = await this.authRepository.findOne({
            where: {
                token: Equal(token),
                expire_at: MoreThan(now),
            }
        });

        if (!auth) {
            throw new ForbiddenException();
        }

        // 投稿が存在するかを取得
        const post = await this.microPostsRepository.findOne({ where: { id: Equal(id) } });
        if (!post) {
            return { deleted: false };
        }

        // 所有者のチェック（投稿者と認証ユーザーが同じでない場合は削除不可）
        if (post.user_id !== auth.user_id) {
            throw new ForbiddenException();
        }

        // 削除実行
        await this.microPostsRepository.delete(id);
        return { deleted: true };
    }
}
