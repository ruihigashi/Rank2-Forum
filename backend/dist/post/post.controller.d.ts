import { PostService } from './post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    createPost(message: string, token: string): Promise<void>;
    getList(token: string, page?: number, records?: number): Promise<{
        posts: {
            id: number;
            content: string;
            user_name: string;
            created_at: Date;
        }[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    deletePost(id: number, token: string): Promise<{
        deleted: boolean;
    }>;
}
