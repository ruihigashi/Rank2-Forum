import { PostService } from './post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    createPost(message: string, token: string): Promise<void>;
    getList(token: string, start: number, records: number): Promise<{
        id: number;
        content: string;
        user_name: string;
        created_at: Date;
    }[]>;
    deletePost(id: number, token: string): Promise<{
        deleted: boolean;
    }>;
}
