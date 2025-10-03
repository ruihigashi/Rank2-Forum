import { Auth } from 'src/entities/auth.js';
import { User } from 'src/entities/user.entity.js';
import { Repository } from 'typeorm';
export declare class UserService {
    private userRepository;
    private auhtRepository;
    constructor(userRepository: Repository<User>, auhtRepository: Repository<Auth>);
    createUser(name: string, email: string, password: string): Promise<void>;
    getUser(token: string, id: number): Promise<User>;
}
