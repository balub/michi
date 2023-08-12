import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ProjectService, ProjectResolver, PrismaService],
})
export class ProjectModule {}
