import { Module } from '@nestjs/common';
import { FeaturesResolver } from './features.resolver';
import { FeaturesService } from './features.service';
import { PrismaService } from 'src/prisma.service';
import { FeaturesController } from './features.controller';

@Module({
  providers: [FeaturesResolver, FeaturesService, PrismaService],
  exports: [FeaturesService],
  controllers: [FeaturesController],
})
export class FeaturesModule {}
