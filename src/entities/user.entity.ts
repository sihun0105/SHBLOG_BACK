import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({ schema: 'SHBLOG', name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id : number;

  @Column({nullable : false})
  email : string;

  @Column( {type:'varchar', name: 'password', length: 100})
  password: string;

  @CreateDateColumn()
  createdAt : Date;

  @UpdateDateColumn()
  updatedAt : Date;

  @DeleteDateColumn()
  deletedAt : Date;
  
}