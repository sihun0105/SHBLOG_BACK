import { ApiProperty, PickType } from '@nestjs/swagger';
import { Users } from '../../entities/user.entity';
export class CreateUserDto extends PickType(Users, [
  'email',
  'nickname',
  'password',
]) {}
