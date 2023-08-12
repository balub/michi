import { Strategy } from 'passport-github2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private usersService: UserService,
  ) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: [process.env.GITHUB_SCOPE],
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const user = await this.usersService.findUserByEmail(
      profile.emails[0].value,
    );

    if (!user) {
      const createdUser = await this.usersService.createUserSSO(
        accessToken,
        refreshToken,
        profile,
      );
      return createdUser;
    }

    /**
     * * displayName and photoURL maybe null if user logged-in via magic-link before SSO
     */
    try {
      await this.usersService.updateUserDetails(user, profile);
    } catch (error) {
      throw new UnauthorizedException(error);
    }

    /**
     * * Check to see if entry for Github is present in the Account table for user
     * * If user was created with another provider findUserByEmail may return true
     */
    const providerAccountExists =
      await this.authService.checkIfProviderAccountExists(user, profile);

    if (!providerAccountExists)
      await this.usersService.createProviderAccount(
        user,
        accessToken,
        refreshToken,
        profile,
      );

    return user;
  }
}
