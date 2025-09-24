import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

// クラスデコレーター
@Entity()
export class Auth {

    // 主キー
    @PrimaryGeneratedColumn()
    readonly id: number;

    // テーブル内の各カラム
    @Column()
    user_id: number;

    @Column('varchar')
    token: string;

    @Column()
    expire_at: Date;

    // タイムスタンプ自動生成
    @CreateDateColumn()
    readonly created_at?: Date;

    @UpdateDateColumn()
    readonly updated_at?: Date;

}