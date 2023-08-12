import { Query, Resolver } from '@nestjs/graphql';
import { GqlUser } from 'src/decorators/gql-user.decorator';
import { User } from './user.model';
import { AuthUser } from 'src/types/AuthUser';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class UserResolver {
  @Query(() => User, {
    description: 'Returns details regarding signed in user',
  })
  @UseGuards(GqlAuthGuard)
  async me(@GqlUser() user: AuthUser) {
    delete user.refreshToken;
    return user;
  }
}
