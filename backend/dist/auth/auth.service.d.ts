import { Auth } from 'src/entities/auth.js';
import { User } from 'src/entities/user.entity.js';
import { Repository } from 'typeorm';
export declare class AuthService {
    private userRepository;
    private authRepository;
    constructor(userRepository: Repository<User>, authRepository: Repository<Auth>);
    getAuth(name: string, password: string): Promise<{
        token: string;
        user_id: number;
    }>;
}
