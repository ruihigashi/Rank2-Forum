import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; // <-- インポート
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        
        ...(configService.get<string>('DATABASE_URL')
          ? {
              // 本番環境 (Render)
              url: configService.get<string>('DATABASE_URL'),
              ssl: { rejectUnauthorized: false },
            }
          : {
              // ローカル環境 (.env ファイルなど)
              host: configService.get<string>('DB_HOST'),
              port: Number(configService.get<string>('DB_PORT')),
              username: configService.get<string>('DB_USER'),
              password: configService.get<string>('DB_PASS'),
              database: configService.get<string>('DB_NAME'),
            }),

        autoLoadEntities: true, 
        synchronize: false,
      }),
    }),
    
    UserModule,
    PostModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}