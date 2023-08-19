import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Project } from 'src/project/project.model';
import { Feature } from './feature.model';
import { FeaturesService } from './features.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { Tags } from 'src/types/Tags';

@Resolver(() => Feature)
export class FeaturesResolver {
  constructor(private readonly featureService: FeaturesService) {}

  @ResolveField(() => Project, {
    description: 'Project feature belongs to',
  })
  async project(@Parent() feature: Feature) {
    try {
      const { id } = feature;
      return await this.featureService.getProjectByFeatureID(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Query(() => Feature, {
    description: 'Return details regarding feature',
  })
  @UseGuards(GqlAuthGuard)
  async feature(@Args('featureID') featureID: string) {
    try {
      return await this.featureService.getFeature(featureID);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Mutation(() => Feature, {
    description: 'Create a new Feature',
  })
  @UseGuards(GqlAuthGuard)
  async createFeature(
    @Args('featureTitle') featureTitle: string,
    @Args('projectID') projectID: string,
    @Args({
      name: 'tags',
      type: () => [Tags],
    })
    tags: Tags[],
  ) {
    return await this.featureService.createFeature(
      featureTitle,
      projectID,
      tags,
    );
  }

  @Mutation(() => Feature, {
    description: 'Edit a Feature',
  })
  @UseGuards(GqlAuthGuard)
  async editFeature(
    @Args('featureID') featureID: string,
    @Args('featureTitle') featureTitle: string,
    @Args({
      name: 'tags',
      type: () => [Tags],
    })
    tags: Tags[],
  ) {
    return await this.featureService.editFeature(featureID, featureTitle, tags);
  }

  @Mutation(() => Boolean, {
    description: 'Delete a Feature',
  })
  @UseGuards(GqlAuthGuard)
  async deleteFeature(@Args('featureID') featureID: string) {
    return await this.featureService.deleteFeature(featureID);
  }

  @Mutation(() => Boolean, {
    description: 'Vote for a Feature',
  })
  @UseGuards(GqlAuthGuard)
  async voteForFeature(
    @Args('featureID') featureID: string,
    @Args('userEmail') userEmail: string,
  ) {
    return await this.featureService.voteForFeature(featureID, userEmail);
  }
}
