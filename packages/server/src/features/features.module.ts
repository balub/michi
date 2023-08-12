import { Module } from '@nestjs/common';
import { FeaturesResolver } from './features.resolver';
import { FeaturesService } from './features.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [FeaturesResolver, FeaturesService, PrismaService],
  exports: [FeaturesService],
})
export class FeaturesModule {}
