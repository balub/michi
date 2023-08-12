import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { PrismaService } from 'src/prisma.service';
import { FeaturesModule } from 'src/features/features.module';
import { UserRequestModule } from 'src/user-request/user-request.module';

@Module({
  imports: [FeaturesModule, UserRequestModule],
  providers: [ProjectService, ProjectResolver, PrismaService],
})
export class ProjectModule {}
