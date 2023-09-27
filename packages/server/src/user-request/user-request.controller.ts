import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { UserRequestService } from './user-request.service';
import { CreateUserRequest } from './Dto/create-user-request.dto';

@Controller('user-request')
export class UserRequestController {
  constructor(private readonly userRequestService: UserRequestService) {}

  @Post()
  async submitRequest(@Body() createUserRequest: CreateUserRequest) {
    try {
      return this.userRequestService.createUserRequest(createUserRequest);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  }
}
