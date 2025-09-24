import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// クラスデコレーターと呼ばれ、Userクラスがデータベースの1つのテーブルに対応するエンティティであることをTypeORMに伝えている
@Entity()
export class User {
    // 主キーのidを定義している
    @PrimaryGeneratedColumn() 
    readonly id: number; // readonlyで一度値が設定されたら変更できないようにしている

    // テーブルの通常カラム
    @Column('varchar') // varcharで可変長の文字列を指定している
    name: string;

    @Column('varchar')
    hash: string;

    @Column('varchar')
    umail: string;

    // タイムスタンプを自動で生成してくれる
    @CreateDateColumn()
    readonly created_at?: Date;

    @UpdateDateColumn()
    readonly updated_at?: Date;
    /* 
    readonlyや?（オプショナル）が付いているのは、
    データベースが自動で設定・更新するため、プログラム側で値を直接指定する必要がないからです
    */
}