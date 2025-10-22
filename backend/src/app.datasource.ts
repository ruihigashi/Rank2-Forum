import { DataSource } from "typeorm";
import * as dotenv from 'dotenv'

dotenv.config();

const AppDataSource = new DataSource({
    type: "postgres", // 使用するデータベースの種類
    ...(process.env.DATABASE_URL
        ? {
            url: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
        }
        : {
            host: process.env.DB_HOST, // データベースサーバーのホスト名
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER, // データベースのユーザー名
            password: process.env.DB_PASS, // データベースのパスワード
            database: process.env.DB_NAME, // データベース名
        }),
    entities: [__dirname + "/entities/*{.ts,.js}"],
    migrations: [__dirname + "/migrations/*{.ts,.js}"],
    synchronize: false,
    logging: true,

})

export default AppDataSource;