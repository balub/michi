import { Body, Controller, Post } from '@nestjs/common';
import { UserRequestService } from './user-request.service';
import { CreateUserRequest } from './Dto/create-user-request.dto';

@Controller('user-request')
export class UserRequestController {
  constructor(private readonly userRequestService: UserRequestService) {}

  @Post()
  async submitRequest(@Body() createUserRequest: CreateUserRequest) {
    // return this.userRequestService.createUserRequest(createUserRequest);
  }
}
