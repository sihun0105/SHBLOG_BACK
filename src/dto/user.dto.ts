import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class UserDto extends CreateUserDto {
  @ApiProperty({
    example: 1,
    description: '아이디',
    required: true,
  })
  id: number;
}
