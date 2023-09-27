import { Module } from '@nestjs/common';
import { UserRequestResolver } from './user-request.resolver';
import { UserRequestService } from './user-request.service';
import { PrismaService } from 'src/prisma.service';
import { UserRequestController } from './user-request.controller';
import { FeaturesService } from 'src/features/features.service';
import { ProjectService } from 'src/project/project.service';

@Module({
  providers: [
    UserRequestResolver,
    UserRequestService,
    FeaturesService,
    UserRequestService,
    ProjectService,
    PrismaService,
  ],
  exports: [UserRequestService],
  controllers: [UserRequestController],
})
export class UserRequestModule {}
