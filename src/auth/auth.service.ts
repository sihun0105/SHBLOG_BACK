import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/user.entity';
import { TokenPayload } from 'src/interface/tokenPayload.interface';
import { UserDto } from '../dto/user.dto';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) 
    private usersRepository: Repository<Users>,
    private userService : UserService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'nickname', 'password'],
    });
    if (!user) {
      return null;
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async tokenValidateUser(payload: TokenPayload): Promise<UserDto | undefined> {
    return await this.userService.findByFields({
        where: { id: payload.id }
    });
}
}
