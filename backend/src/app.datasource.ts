import { DataSource } from "typeorm"
require("dotenv").config();

const AppDataSource = new DataSource({
    type: "postgres", // 使用するデータベースの種類
    host: process.env.DB_HOST, // データベースサーバーのホスト名
    username: process.env.DB_USER, // データベースのユーザー名
    password: process.env.DB_PASS, // データベースのパスワード
    database: process.env.DB_NAME, // データベース名
    entities: ["src/entities/*.ts"], 
    migrations: ["src/migration/*{.ts,.js}"],
})  

export default AppDataSource;