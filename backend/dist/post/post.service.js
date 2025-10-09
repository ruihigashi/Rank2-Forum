"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_1 = require("../entities/auth");
const microposts_1 = require("../entities/microposts");
const typeorm_2 = require("typeorm");
let PostService = class PostService {
    microPostsRepository;
    authRepository;
    constructor(microPostsRepository, authRepository) {
        this.microPostsRepository = microPostsRepository;
        this.authRepository = authRepository;
    }
    async createPost(message, token) {
        const now = new Date();
        const auth = await this.authRepository.findOne({
            where: {
                token: (0, typeorm_2.Equal)(token),
                expire_at: (0, typeorm_2.MoreThan)(now),
            }
        });
        if (!auth) {
            throw new common_1.ForbiddenException();
        }
        const record = {
            user_id: auth.user_id,
            content: message,
        };
        await this.microPostsRepository.save(record);
    }
    async getList(token, start = 0, nr_records = 1) {
        const now = new Date();
        const auth = await this.authRepository.findOne({
            where: {
                token: (0, typeorm_2.Equal)(token),
                expire_at: (0, typeorm_2.MoreThan)(now),
            }
        });
        if (!auth) {
            throw new common_1.ForbiddenException();
        }
        const qb = await this.microPostsRepository
            .createQueryBuilder('micro_post')
            .leftJoinAndSelect('user', 'user', 'user.id = micro_post.user_id')
            .select([
            'micro_post.id as id',
            'user.name as user_name',
            'micro_post.content as content',
            'micro_post.created_at as created_at'
        ])
            .orderBy('micro_post.created_at', 'DESC')
            .offset(start)
            .limit(nr_records);
        const records = await qb.getRawMany();
        console.log(records);
        return records;
    }
    async deletePost(id, token) {
        const now = new Date();
        const auth = await this.authRepository.findOne({
            where: {
                token: (0, typeorm_2.Equal)(token),
                expire_at: (0, typeorm_2.MoreThan)(now),
            }
        });
        if (!auth) {
            throw new common_1.ForbiddenException();
        }
        const post = await this.microPostsRepository.findOne({ where: { id: (0, typeorm_2.Equal)(id) } });
        if (!post) {
            return { deleted: false };
        }
        if (post.user_id !== auth.user_id) {
            throw new common_1.ForbiddenException();
        }
        await this.microPostsRepository.delete(id);
        return { deleted: true };
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(microposts_1.MicroPost)),
    __param(1, (0, typeorm_1.InjectRepository)(auth_1.Auth)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PostService);
//# sourceMappingURL=post.service.js.map