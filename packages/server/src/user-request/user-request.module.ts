import { Module } from '@nestjs/common';
import { UserRequestResolver } from './user-request.resolver';
import { UserRequestService } from './user-request.service';
import { PrismaService } from 'src/prisma.service';
import { UserRequestController } from './user-request.controller';

@Module({
  providers: [UserRequestResolver, UserRequestService, PrismaService],
  exports: [UserRequestService],
  controllers: [UserRequestController],
})
export class UserRequestModule {}
