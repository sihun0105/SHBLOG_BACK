import { TypeOrmModule } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { Users } from 'src/entities/user.entity';

dotenv.config();
const config: TypeOrmModule = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities : [Users],
  autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: false, //개발환경일 때 만 한번만 돌리고 false해야댐 아니면 DB다시 만들어서 데이터 날라감 주의!!!!
  logging: true,
  keepConnectionAlive: true,
};

export = config;
