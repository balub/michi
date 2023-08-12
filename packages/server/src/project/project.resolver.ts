import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Project } from './project.model';
import { ProjectService } from './project.service';

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Query(() => Project, {
    description: 'Get Project Details',
  })
  async project(@Args('Project_ID') projectID: string) {
    try {
      return await this.projectService.getProject(projectID);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => Project, {
    description: 'Create a new project',
  })
  async createProject(@Args('title') title: string) {
    return await this.projectService.createNewProject(title);
  }
}
