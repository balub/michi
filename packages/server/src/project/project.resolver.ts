import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Project } from './project.model';
import { ProjectService } from './project.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { FeaturesService } from 'src/features/features.service';
import { GqlUser } from 'src/decorators/gql-user.decorator';
import { AuthUser } from 'src/types/AuthUser';
import { UserRequestService } from 'src/user-request/user-request.service';
import { Feature } from 'src/features/feature.model';
import { User } from 'src/user/user.model';
import { UserRequest } from 'src/user-request/user-request.model';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly featuresService: FeaturesService,
    private readonly userRequestService: UserRequestService,
  ) {}

  @ResolveField(() => [Feature], {
    description: 'Return all features of this project',
  })
  async features(@Parent() project: Project): Promise<Feature[]> {
    const { id } = project;
    return await this.featuresService.getFeaturesByProjectID(id);
  }

  @ResolveField(() => User, {
    description: 'Returns the user who created the project',
  })
  async user(@GqlUser() user: AuthUser) {
    delete user.refreshToken;
    return user;
  }

  @ResolveField(() => [UserRequest], {
    description: 'Returns all user-requests for this project',
  })
  async userRequests(@Parent() project: Project) {
    const { id } = project;
    return await this.userRequestService.getUserRequestsByProjectID(id);
  }

  @Query(() => Project, {
    description: 'Get Project Details',
  })
  @UseGuards(GqlAuthGuard)
  async project(@Args('projectId') projectID: string) {
    try {
      return await this.projectService.getProject(projectID);
    } catch (error) {
      throw new Error(error);
    }
  }

  // TODO: add cursor based pagination
  @Query(() => [Project], { description: 'List all projects' })
  @UseGuards(GqlAuthGuard)
  async listAllProjects(@GqlUser() user: AuthUser) {
    return await this.projectService.getAllProjects(user.uid);
  }

  @Mutation(() => Project, {
    description: 'Create a new project',
  })
  @UseGuards(GqlAuthGuard)
  async createProject(@Args('title') title: string, @GqlUser() user: AuthUser) {
    return await this.projectService.createNewProject(title, user.uid);
  }
}
