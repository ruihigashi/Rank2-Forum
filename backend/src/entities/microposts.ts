import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

// クラスデコレーター
@Entity()
export class MicroPost {

    // 主キーと設定し、自動でユニークな連番を割り振る
    @PrimaryGeneratedColumn()
    readonly id: number;

    // テーブル内のカラム
    @Column()
    user_id: number;

    @Column()
    content: string;

    // タイムスタンプ自動生成
    @CreateDateColumn()
    readonly created_at?: Date;
    
    @UpdateDateColumn()
    readonly updated_at?: Date;

}