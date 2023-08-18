import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Feature {
  @Field(() => ID)
  id: string;

  @Field()
  feature: string;

  @Field()
  upvotes: number;

  @Field((type) => [String])
  votedUsers: string[];

  @Field((type) => [String])
  tags: string[];

  @Field()
  createdAt: Date;
}
