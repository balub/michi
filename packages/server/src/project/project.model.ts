import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Project {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;
}
