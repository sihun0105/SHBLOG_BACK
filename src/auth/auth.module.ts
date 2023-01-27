import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { SendmailModule } from 'src/sendmail/sendmail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { LocalSerializer } from './local.serializer';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME },
    }),
  ],
  providers: [AuthService, LocalStrategy,LocalSerializer],
  exports: [AuthService],
})
export class AuthModule {}