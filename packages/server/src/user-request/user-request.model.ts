import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserRequest {
  @Field(() => ID)
  id: string;

  @Field()
  request: string;

  @Field()
  requestBy: string;

  @Field()
  createdAt: Date;
}
