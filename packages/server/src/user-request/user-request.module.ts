import { Module } from '@nestjs/common';
import { UserRequestResolver } from './user-request.resolver';
import { UserRequestService } from './user-request.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UserRequestResolver, UserRequestService, PrismaService],
  exports: [UserRequestService],
})
export class UserRequestModule {}
