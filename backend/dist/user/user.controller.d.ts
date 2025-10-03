import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(name: string, email: string, password: string): void;
    getUser(id: number, token: string): Promise<import("../entities/user.entity").User>;
}
