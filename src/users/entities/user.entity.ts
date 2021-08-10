import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('users')

export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:String;

}