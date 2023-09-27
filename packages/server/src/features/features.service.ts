import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Feature } from './feature.model';
import { Project } from 'src/project/project.model';
import { Tags } from 'src/types/Tags';
import {
  FEATURE_NOT_FOUND,
  USER_ALREADY_VOTED,
  USER_EMAIL_INVALID,
} from 'src/errors';
import { Prisma } from '@prisma/client';
import { validateEmail } from 'src/utils';

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

  async getProjectByFeatureID(featureID: string): Promise<Project> {
    try {
      const feature = await this.prismaService.feature.findUniqueOrThrow({
        where: {
          id: featureID,
        },
        include: {
          Project: true,
        },
      });

      return feature.Project;
    } catch (error) {
      throw new Error(FEATURE_NOT_FOUND);
    }
  }

  async getFeature(featureID: string): Promise<Feature> {
    try {
      const feature = await this.prismaService.feature.findFirstOrThrow({
        where: {
          id: featureID,
        },
      });

      return feature;
    } catch (error) {
      throw new Error(FEATURE_NOT_FOUND);
    }
  }

  async createFeature(
    featureTitle: string,
    projectID: string,
    tags: Tags[],
  ): Promise<Feature> {
    return await this.prismaService.feature.create({
      data: {
        feature: featureTitle,
        Project: {
          connect: {
            id: projectID,
          },
        },
        tags: tags,
      },
    });
  }

  async editFeature(featureID: string, featureTitle: string, tags: Tags[]) {
    try {
      const updatedFeature = await this.prismaService.feature.update({
        where: {
          id: featureID,
        },
        data: {
          feature: featureTitle,
          tags: tags,
        },
      });

      return updatedFeature;
    } catch (error) {
      throw new Error(FEATURE_NOT_FOUND);
    }
  }

  async deleteFeature(featureID: string) {
    try {
      await this.prismaService.feature.delete({
        where: {
          id: featureID,
        },
      });

      return true;
    } catch (error) {
      throw new Error(FEATURE_NOT_FOUND);
    }
  }

  async voteForFeature(featureID: string, userEmail: string) {
    try {
      if (!validateEmail(userEmail)) throw new Error(USER_EMAIL_INVALID);

      const feature = await this.getFeature(featureID);

      if (feature.votedUsers.includes(userEmail)) {
        throw new Error(USER_ALREADY_VOTED);
      }

      await this.prismaService.feature.update({
        where: {
          id: featureID,
        },
        data: {
          upvotes: {
            increment: 1,
          },
          votedUsers: {
            push: userEmail,
          },
        },
      });

      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(FEATURE_NOT_FOUND);
      }
      throw error;
    }
  }
}
