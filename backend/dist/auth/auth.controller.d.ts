import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getAuth(name: string, password: string): Promise<{
        token: string;
        user_id: number;
    }>;
}
