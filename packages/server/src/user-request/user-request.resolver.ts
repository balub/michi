import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserRequest } from './user-request.model';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UserRequestService } from './user-request.service';

@Resolver()
export class UserRequestResolver {
  constructor(private readonly userRequestService: UserRequestService) {}

  @Query(() => UserRequest, {
    description: 'Get All User Requests',
  })
  @UseGuards(GqlAuthGuard)
  async allUserRequests() {
    try {
      return await this.userRequestService.getAllUserRequests();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => UserRequest, {
    description: 'Accept User Request',
  })
  @UseGuards(GqlAuthGuard)
  async acceptUserRequest(@Args('userRequestId') requestId: string) {
    try {
      return await this.userRequestService.acceptUserRequest(requestId);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => UserRequest, {
    description: 'Reject User Requests',
  })
  @UseGuards(GqlAuthGuard)
  async rejectUserRequest(@Args('userRequestId') requestId: string) {
    try {
      return await this.userRequestService.rejectUserRequest(requestId);
    } catch (error) {
      throw new Error(error);
    }
  }
}
