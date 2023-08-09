import { Injectable } from '@nestjs/common';
import { PROJECT_NOT_FOUND } from 'src/errors';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProject(projectID: string) {
    try {
      const project = this.prismaService.project.findFirst({
        where: {
          id: projectID,
        },
      });
      return project;
    } catch (error) {
      throw new Error(PROJECT_NOT_FOUND);
    }
  }

  async createNewProject(title: string) {
    const createdProject = await this.prismaService.project.create({
      data: {
        title: title,
      },
    });

    return createdProject;
  }
}
