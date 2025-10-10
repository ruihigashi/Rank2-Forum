import { Auth } from 'src/entities/auth';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepository;
    private auhtRepository;
    constructor(userRepository: Repository<User>, auhtRepository: Repository<Auth>);
    createUser(name: string, email: string, password: string): Promise<void>;
    getUser(token: string, id: number): Promise<User>;
    updateUser(name: string, email: string, id: number, token: string, created_at?: string): Promise<any>;
}
