import { Injectable } from '@nestjs/common';
import { USER_NOT_FOUND } from 'src/errors';
import { PrismaService } from 'src/prisma.service';
import { AuthUser } from 'src/types/AuthUser';
import { User as DbUser } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Find User with given email id
   *
   * @param email User's email
   * @returns User
   */
  async findUserByEmail(email: string): Promise<AuthUser | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) return null;

    return user;
  }

  /**
   * Find User with given ID
   *
   * @param userUid User ID
   * @returns User
   */
  async findUserById(userUid: string): Promise<AuthUser> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          uid: userUid,
        },
      });
      return user;
    } catch (error) {
      return error;
    }
  }

  /**
   * Create a new User when logged in via a SSO provider
   *
   * @param accessTokenSSO  User's access token generated by providers
   * @param refreshTokenSSO User's refresh token generated by providers
   * @param profile Data received from SSO provider on the users account
   * @returns Created User
   */
  async createUserSSO(
    accessTokenSSO: string,
    refreshTokenSSO: string,
    profile,
  ): Promise<AuthUser> {
    const userDisplayName = !profile.displayName ? null : profile.displayName;
    const userPhotoURL = !profile.photos ? null : profile.photos[0].value;

    const createdUser = await this.prisma.user.create({
      data: {
        displayName: userDisplayName,
        email: profile.emails[0].value,
        photoURL: userPhotoURL,
        providerAccounts: {
          create: {
            provider: profile.provider,
            providerAccountId: profile.id,
            providerRefreshToken: refreshTokenSSO,
            providerAccessToken: accessTokenSSO,
          },
        },
      },
    });

    return createdUser;
  }

  /**
   * Update User displayName and photoURL
   *
   * @param user User object
   * @param profile Data received from SSO provider on the users account
   * @returns Updated user object
   */
  async updateUserDetails(user: AuthUser, profile): Promise<AuthUser> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: {
          uid: user.uid,
        },
        data: {
          displayName: !profile.displayName ? null : profile.displayName,
          photoURL: !profile.photos ? null : profile.photos[0].value,
        },
      });
      return updatedUser;
    } catch (error) {
      throw new Error(USER_NOT_FOUND);
    }
  }

  /**
   * Create a new  Account for a given User
   *
   * @param user User object
   * @param accessToken User's access token generated by providers
   * @param refreshToken User's refresh token generated by providers
   * @param profile Data received from SSO provider on the users account
   * @returns Created Account
   */
  async createProviderAccount(
    user: AuthUser,
    accessToken: string,
    refreshToken: string,
    profile,
  ) {
    const createdProvider = await this.prisma.account.create({
      data: {
        provider: profile.provider,
        providerAccountId: profile.id,
        providerRefreshToken: refreshToken ? refreshToken : null,
        providerAccessToken: accessToken ? accessToken : null,
        user: {
          connect: {
            uid: user.uid,
          },
        },
      },
    });

    return createdProvider;
  }

  /**
   * Update User with new generated hashed refresh token
   *
   * @param refreshTokenHash Hash of newly generated refresh token
   * @param userUid User uid
   * @returns User with updated refreshToken
   */
  async UpdateUserRefreshToken(
    refreshTokenHash: string,
    userUid: string,
  ): Promise<AuthUser> {
    try {
      const user = await this.prisma.user.update({
        where: {
          uid: userUid,
        },
        data: {
          refreshToken: refreshTokenHash,
        },
      });

      return user;
    } catch (error) {
      throw new Error(USER_NOT_FOUND);
    }
  }
}