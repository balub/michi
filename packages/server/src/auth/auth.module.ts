import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RTJwtStrategy } from './strategies/rt-jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { GithubStrategy } from './strategies/github.strategy';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [
    PrismaService,
    AuthService,
    JwtStrategy,
    RTJwtStrategy,
    GoogleStrategy,
    GithubStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
