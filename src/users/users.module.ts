import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
//import { JwtModule } from '@nestjs/jwt';
import { SendmailModule } from 'src/sendmail/sendmail.module';
@Module({
  imports: [
    SendmailModule,
    TypeOrmModule.forFeature([Users]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports : [UserService]
})
export class UsersModule {}
