import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBadGatewayResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { NotLoggedInGuard } from 'src/middleware/not-logged-in-guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
}
