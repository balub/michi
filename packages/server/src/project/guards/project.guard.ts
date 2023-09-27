import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ProjectService } from '../project.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PROJECT_NOT_FOUND } from 'src/errors';

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(private readonly projectService: ProjectService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const GQLExecContext = GqlExecutionContext.create(context);

    const { projectID } = GQLExecContext.getArgs<{
      projectID: string;
    }>();

    try {
      await this.projectService.getProject(projectID);
      return true;
    } catch (error) {
      throw new Error(PROJECT_NOT_FOUND);
    }
  }
}
