import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, FindOneOptions } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/dto/user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly dataSource: DataSource,
  ) {}

  async create(email: string, nickname: string, password: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const user = await queryRunner.manager
      .getRepository(Users)
      .findOne({ where: { email } });
    if (user) {
      throw new ForbiddenException('이미 존재하는 사용자입니다. '); // 유저 정보가 있다면?
    }
    const hashedPassword = await bcrypt.hash(password, 12); // 없다면 비밀번호 암호화
    try {
      const returned = await queryRunner.manager.getRepository(Users).save({
        // 테이블에 추가
        email,
        nickname,
        password: hashedPassword,
      });
      //throw new Error('rolback test!?!?!?');
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  async findByFields(options: FindOneOptions<UserDto>): Promise<Users | undefined> {
    return await this.usersRepository.findOne(options);
}
  
}
