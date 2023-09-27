import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserRequest } from './user-request.model';
import { CreateUserRequest } from './Dto/create-user-request.dto';
import { USER_EMAIL_INVALID, USER_REQUEST_NOT_FOUND } from 'src/errors';
import { FeaturesService } from 'src/features/features.service';
import { Prisma } from '@prisma/client';
import { Tags } from 'src/types/Tags';
import { Feature } from 'src/features/feature.model';
import { validateEmail } from 'src/utils';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class UserRequestService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly featureService: FeaturesService,
    private readonly projectService: ProjectService,
  ) {}

  async createUserRequest(
    createUserRequest: CreateUserRequest,
  ): Promise<UserRequest> {
    try {
      if (!validateEmail(createUserRequest.requestBy))
        throw new Error(USER_EMAIL_INVALID);

      const project = await this.projectService.getProject(
        createUserRequest.projectId,
      );

      return await this.prismaService.userRequest.create({
        data: {
          ...createUserRequest,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getUserRequestsByProjectID(projectID: string): Promise<UserRequest[]> {
    const userRequests = await this.prismaService.userRequest.findMany({
      where: {
        projectId: projectID,
      },
    });
    // Remove the projectId property from all elements in userRequests array
    const result = userRequests.filter((item) => {
      delete item.projectId;
      return item;
    });

    return result;
  }

  async getAllUserRequests(projectID: string): Promise<UserRequest[]> {
    return await this.prismaService.userRequest.findMany({
      where: {
        projectId: projectID,
      },
    });
  }

  async getUserRequest(requestId: string): Promise<UserRequest> {
    try {
      return await this.prismaService.userRequest.findUniqueOrThrow({
        where: {
          id: requestId,
        },
      });
    } catch (error) {
      throw new Error(USER_REQUEST_NOT_FOUND);
    }
  }

  async elevateUserRequest(requestId: string): Promise<Feature> {
    try {
      const userRequest = await this.prismaService.userRequest.findFirstOrThrow(
        {
          where: {
            id: requestId,
          },
        },
      );

      const newFeature = await this.featureService.createFeature(
        userRequest.request,
        userRequest.projectId,
        [Tags.NEWLY_ADDED],
      );

      await this.removeUserRequest(userRequest.id);

      return newFeature;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(USER_REQUEST_NOT_FOUND);
      }
      throw error;
    }
  }

  async removeUserRequest(requestId: string) {
    try {
      await this.prismaService.userRequest.delete({
        where: {
          id: requestId,
        },
      });

      return true;
    } catch (error) {
      throw new Error(USER_REQUEST_NOT_FOUND);
    }
  }
}
