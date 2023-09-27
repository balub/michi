import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRequestService } from '../user-request.service';

@Injectable()
export class UserRequestGuard implements CanActivate {
  constructor(private readonly userRequestService: UserRequestService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const GQLExecContext = GqlExecutionContext.create(context);

    const { userRequestId } = GQLExecContext.getArgs<{
      userRequestId: string;
    }>();

    try {
      await this.userRequestService.getUserRequest(userRequestId);

      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
