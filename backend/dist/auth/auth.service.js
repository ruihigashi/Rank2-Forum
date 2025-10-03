"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_1 = require("../entities/auth");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    userRepository;
    authRepository;
    constructor(userRepository, authRepository) {
        this.userRepository = userRepository;
        this.authRepository = authRepository;
    }
    async getAuth(name, password) {
        if (!password) {
            throw new common_1.UnauthorizedException();
        }
        const user = await this.userRepository.findOne({ where: { name: (0, typeorm_2.Equal)(name) } });
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        const isMatch = await bcrypt.compare(password, user.hash);
        if (!isMatch) {
            throw new common_1.UnauthorizedException();
        }
        const ret = {
            token: '',
            user_id: user.id,
        };
        var expire = new Date();
        expire.setDate(expire.getDate() + 1);
        const auth = await this.authRepository.findOne({
            where: {
                user_id: (0, typeorm_2.Equal)(user.id)
            },
        });
        if (auth) {
            auth.expire_at = expire;
            await this.authRepository.save(auth);
            ret.token = auth.token;
        }
        else {
            const token = crypto.randomUUID();
            const record = {
                user_id: user.id,
                token: token,
                expire_at: expire.toISOString(),
            };
            await this.authRepository.save(record);
            ret.token = token;
        }
        return ret;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(auth_1.Auth)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map