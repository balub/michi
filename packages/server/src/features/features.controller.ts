import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FeaturesService } from './features.service';
import { VoteForFeatDTO } from './Dto/vote-for-feature-dto';

@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Get(':id')
  async listAllFeatures(@Param('id') projectID: string) {
    return this.featuresService.getFeaturesByProjectID(projectID);
  }

  @Post('/upvote/:id')
  async voteForFeature(
    @Param('id') featureID: string,
    @Body() voteForFeatDTO: VoteForFeatDTO,
  ) {
    try {
      return await this.featuresService.voteForFeature(
        featureID,
        voteForFeatDTO.email,
      );
    } catch (err) {
      throw new HttpException(err?.message, HttpStatus.CONFLICT);
    }
  }
}
