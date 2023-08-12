import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Feature } from './feature.model';

@Injectable()
export class FeaturesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFeaturesByProjectID(projectID: string): Promise<Feature[]> {
    const features = await this.prismaService.feature.findMany({
      where: {
        projectId: projectID,
      },
    });

    return features;
  }
}
