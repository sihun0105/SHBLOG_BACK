import { ApiProperty, PickType } from '@nestjs/swagger';
import { Users } from '../../entities/user.entity';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
  example : "test@test.com",
  description : "가입할 이메일",
  required : true
  })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email : string;

  @ApiProperty({
    example : "1111",
    description : "가입할 유저의 비밀번호",
    required : true
    })
  @IsNotEmpty()
  @IsString()
  password : string;
  
  @ApiProperty({
    example : "testKing",
    description : "가입할 유저의 닉네임",
    required : true
    })
  @IsNotEmpty()
  nickname : string;
}
