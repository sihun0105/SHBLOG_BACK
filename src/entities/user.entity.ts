import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'SHBLOG', name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}