import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Project } from './project.model';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProject(projectID: string): Promise<Project> {
    try {
      const project = this.prismaService.project.findFirstOrThrow({
        where: {
          id: projectID,
        },
      });
      return project;
    } catch (error) {
      throw error;
    }
  }

  async createNewProject(title: string, userID: string): Promise<Project> {
    const createdProject = await this.prismaService.project.create({
      data: {
        title: title,
        userUid: userID,
      },
    });

    return createdProject;
  }

  async getAllProjects(userID: string): Promise<Project[]> {
    return await this.prismaService.project.findMany({
      where: {
        userUid: userID,
      },
    });
  }
}
