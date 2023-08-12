import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserRequest } from './user-request.model';

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
}
