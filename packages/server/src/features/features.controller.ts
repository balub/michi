import { Controller, Get, Param } from '@nestjs/common';
import { FeaturesService } from './features.service';

@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Get(':id')
  async listAllFeatures(@Param('id') projectID: string) {
    return this.featuresService.getFeaturesByProjectID(projectID);
  }
}
