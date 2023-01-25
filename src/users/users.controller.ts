import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Response,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBadGatewayResponse,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { UserDto } from 'src/dto/user.dto';
import { User } from '../decorators/user.decorator';
import { UndefinedTonullInterceptor } from 'src/common/undefinedTonull.interceptor';
import { LoggedInGuard } from 'src/auth/logged-in-guard';
import { NotLoggedInGuard } from 'src/auth/not-logged-in-guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
@UseInterceptors(UndefinedTonullInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '회원가입' })
  @UseGuards(NotLoggedInGuard)
  @Post('join')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(
      createUserDto.email,
      createUserDto.nickname,
      createUserDto.password,
    );
  }

  @ApiOkResponse({
    type: UserDto,
    description: '성공',
  })
  @ApiBadGatewayResponse({
    description: '서버 에러',
  })
  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  logIn(@User() user) {
    return user;
  }

  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: '로그아웃' })
  @UseGuards(LoggedInGuard)
  @Post('logout')
  async logout(@Response() res) {
    res.clearCookie('connect.sid', { httpOnly: true });
    return res.send('ok');
  }

  @Get('findAll')
  async findAll() {
    return this.userService.findAll();
  }
}
