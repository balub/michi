import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserRequest } from './user-request.model';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UserRequestService } from './user-request.service';
import { Feature } from 'src/features/feature.model';
import { UserRequestGuard } from './guards/user-request.guard';
import { ProjectGuard } from 'src/project/guards/project.guard';

@Resolver()
export class UserRequestResolver {
  constructor(private readonly userRequestService: UserRequestService) {}

  @Query(() => [UserRequest], {
    description: 'Get All User Requests',
  })
  @UseGuards(GqlAuthGuard, ProjectGuard)
  async allUserRequests(@Args('projectID') projectID: string) {
    try {
      return await this.userRequestService.getAllUserRequests(projectID);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => Feature, {
    description: 'Accept User Request',
  })
  @UseGuards(GqlAuthGuard, UserRequestGuard)
  async acceptUserRequest(@Args('userRequestId') requestId: string) {
    try {
      return await this.userRequestService.elevateUserRequest(requestId);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => Boolean, {
    description: 'Reject User Requests',
  })
  @UseGuards(GqlAuthGuard, UserRequestGuard)
  async rejectUserRequest(@Args('userRequestId') requestId: string) {
    try {
      return await this.userRequestService.removeUserRequest(requestId);
    } catch (error) {
      throw new Error(error);
    }
  }
}
