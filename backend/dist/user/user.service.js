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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const typeorm_1 = require("@nestjs/typeorm");
const auth_1 = require("../entities/auth");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    userRepository;
    auhtRepository;
    constructor(userRepository, auhtRepository) {
        this.userRepository = userRepository;
        this.auhtRepository = auhtRepository;
    }
    async createUser(name, email, password) {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        const record = {
            name: name,
            umail: email,
            hash: hash,
        };
        await this.userRepository.save(record);
    }
    async getUser(token, id) {
        const now = new Date();
        const auth = await this.auhtRepository.findOne({
            where: {
                token: (0, typeorm_2.Equal)(token),
                expire_at: (0, typeorm_2.MoreThan)(now),
            }
        });
        if (!auth) {
            throw new common_1.ForbiddenException();
        }
        const user = await this.userRepository.findOne({
            where: {
                id: (0, typeorm_2.Equal)(id),
            }
        });
        if (!user) {
            throw new common_1.NotFoundException();
        }
        return user;
    }
    async updateUser(name, email, id, token, created_at) {
        const now = new Date();
        const auth = await this.auhtRepository.findOne({
            where: {
                token: (0, typeorm_2.Equal)(token),
                expire_at: (0, typeorm_2.MoreThan)(now),
            }
        });
        if (!auth) {
            throw new common_1.ForbiddenException();
        }
        const user = await this.userRepository.findOne({ where: { id: (0, typeorm_2.Equal)(id) } });
        if (!user) {
            throw new common_1.NotFoundException();
        }
        if (auth.user_id !== id) {
            throw new common_1.ForbiddenException();
        }
        if (name)
            user.name = name;
        if (email)
            user.umail = email;
        if (created_at) {
            const dt = new Date(created_at);
            if (!isNaN(dt.getTime())) {
                user.created_at = dt;
            }
        }
        const updated = await this.userRepository.save(user);
        const safeUser = { ...updated };
        delete safeUser.hash;
        return safeUser;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(auth_1.Auth)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map