import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserRequest } from './user-request.model';
import { CreateUserRequest } from './Dto/create-user-request.dto';

@Injectable()
export class UserRequestService {
  constructor(private readonly prismaService: PrismaService) {}

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

  async getAllUserRequests(): Promise<UserRequest[]> {
    return await this.prismaService.userRequest.findMany();
  }

  async acceptUserRequest(requestId: string): Promise<UserRequest> {
    return await this.prismaService.userRequest.update({
      data: {},
      where: {
        id: requestId,
      },
    });
  }

  async rejectUserRequest(requestId: string): Promise<UserRequest> {
    return await this.prismaService.userRequest.update({
      data: {},
      where: {
        id: requestId,
      },
    });
  }

  async createUserRequest(
    createUserRequest: CreateUserRequest,
  ): Promise<UserRequest> {
    return await this.prismaService.userRequest.create({
      data: {
        ...createUserRequest,
      },
    });
  }
}
