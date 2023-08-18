import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { USER_NOT_FOUND } from 'src/errors';
import { PrismaService } from 'src/prisma.service';
import {
  AccessTokenPayload,
  AuthTokens,
  RefreshTokenPayload,
} from 'src/types/AuthTokens';
import { AuthUser } from 'src/types/AuthUser';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * Verify if Provider account exists for User
   *
   * @param user User Object
   * @param SSOUserData User data from SSO providers (Magic,Google,Github,Microsoft)
   * @returns User provider Account
   */
  async checkIfProviderAccountExists(user: AuthUser, SSOUserData) {
    const provider = await this.prismaService.account.findUnique({
      where: {
        verifyProviderAccount: {
          provider: SSOUserData.provider,
          providerAccountId: SSOUserData.id,
        },
      },
    });

    if (!provider) return null;

    return provider;
  }

  /**
   * Generate new refresh token for user
   *
   * @param userUid User Id
   * @returns Generated refreshToken
   */
  private async generateRefreshToken(userUid: string) {
    try {
      const refreshTokenPayload: RefreshTokenPayload = {
        iss: process.env.BASE_URL ?? '',
        sub: userUid,
        aud: [process.env.BASE_URL ?? ''],
      };

      const refreshToken = await this.jwtService.sign(refreshTokenPayload, {
        expiresIn: process.env.REFRESH_TOKEN_VALIDITY, // 7 Days
      });

      const refreshTokenHash = await argon2.hash(refreshToken);

      await this.usersService.UpdateUserRefreshToken(refreshTokenHash, userUid);

      return refreshToken;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Generate access and refresh token pair
   *
   * @param userUid User ID
   * @returns Generated AuthTokens
   */
  async generateAuthTokens(userUid: string) {
    try {
      const accessTokenPayload: AccessTokenPayload = {
        iss: process.env.VITE_BASE_URL ?? '',
        sub: userUid,
        aud: [process.env.VITE_BASE_URL ?? ''],
      };

      const refreshToken = await this.generateRefreshToken(userUid);

      return <AuthTokens>{
        access_token: await this.jwtService.sign(accessTokenPayload, {
          expiresIn: process.env.ACCESS_TOKEN_VALIDITY, //1 Day
        }),
        refresh_token: refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Refresh refresh and auth tokens
   *
   * @param hashedRefreshToken Hashed refresh token received from client
   * @param user User Object
   * @returns Generated AuthTokens
   */
  async refreshAuthTokens(hashedRefreshToken: string, user: AuthUser) {
    try {
      // Check to see user is valid
      if (!user) throw new NotFoundException(USER_NOT_FOUND);

      // Check to see if the hashed refresh_token received from the client is the same as the refresh_token saved in the DB
      const isTokenMatched = await argon2.verify(
        user.refreshToken ?? '',
        hashedRefreshToken,
      );
      if (!isTokenMatched) throw new NotFoundException(USER_NOT_FOUND);

      // if tokens match, generate new pair of auth tokens
      const generatedAuthTokens = await this.generateAuthTokens(user.uid);

      return generatedAuthTokens;
    } catch (error) {
      throw error;
    }
  }
}
