import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Project } from './project.model';
import { ProjectService } from './project.service';

@Resolver((of) => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation(() => Project, {
    description: 'Create a new project',
  })
  async createProject(@Args() title: string) {
    return await this.projectService.createNewProject(title);
  }
}
