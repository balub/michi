import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RTJwtAuthGuard } from './guards/rt-jwt-auth.guard';
import { AuthUser } from 'src/types/AuthUser';
import { GqlUser } from 'src/decorators/gql-user.decorator';
import { RTCookie } from 'src/decorators/rt-cookie.decorator';
import { authCookieHandler, throwHTTPErr } from './helper';
import { GoogleSSOGuard } from './guards/google-sso.guard';
import { GithubSSOGuard } from './guards/github-sso.guard';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   ** Route to refresh auth tokens with Refresh Token Rotation
   * @see https://auth0.com/docs/secure/tokens/refresh-tokens/refresh-token-rotation
   */
  @Get('refresh')
  @UseGuards(RTJwtAuthGuard)
  async refresh(
    @GqlUser() user: AuthUser,
    @RTCookie() refresh_token: string,
    @Res() res,
  ) {
    try {
      const newTokenPair = await this.authService.refreshAuthTokens(
        refresh_token,
        user,
      );
      authCookieHandler(res, newTokenPair, false);
    } catch (error) {
      throwHTTPErr(error);
    }
  }

  /**
   ** Route to initiate SSO auth via Google
   */
  @Get('google')
  @UseGuards(GoogleSSOGuard)
  async googleAuth(@Res() res) {}

  /**
   ** Callback URL for Google SSO
   * @see https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow#how-it-works
   */
  @Get('google/callback')
  @UseGuards(GoogleSSOGuard)
  async googleAuthRedirect(@Request() req, @Res() res) {
    try {
      const authTokens = await this.authService.generateAuthTokens(
        req.user.uid,
      );
      authCookieHandler(res, authTokens, true);
    } catch (error) {
      throwHTTPErr(error);
    }
  }

  /**
   ** Route to initiate SSO auth via Github
   */
  @Get('github')
  @UseGuards(GithubSSOGuard)
  async githubAuth(@Request() req) {}

  /**
   ** Callback URL for Github SSO
   * @see https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow#how-it-works
   */
  @Get('github/callback')
  @UseGuards(GithubSSOGuard)
  async githubAuthRedirect(@Request() req, @Res() res) {
    try {
      const authTokens = await this.authService.generateAuthTokens(
        req.user.uid,
      );
      authCookieHandler(res, authTokens, true);
    } catch (error) {
      throwHTTPErr(error);
    }
  }

  /**
   ** Log user out by clearing cookies containing auth tokens
   */
  @Get('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.status(200).send();
  }
}
