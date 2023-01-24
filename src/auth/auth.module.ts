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

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([Users]),
  ],
  providers: [AuthService, LocalStrategy,LocalSerializer],
  exports: [AuthService],
})
export class AuthModule {}