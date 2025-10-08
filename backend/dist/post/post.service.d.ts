import { Auth } from 'src/entities/auth';
import { MicroPost } from 'src/entities/microposts';
import { Repository } from 'typeorm';
export declare class PostService {
    private microPostsRepository;
    private authRepository;
    constructor(microPostsRepository: Repository<MicroPost>, authRepository: Repository<Auth>);
    createPost(message: string, token: string): Promise<void>;
    getList(token: string, start?: number, nr_records?: number): Promise<{
        id: number;
        content: string;
        user_name: string;
        created_at: Date;
    }[]>;
}
