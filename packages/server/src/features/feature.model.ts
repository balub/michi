import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Tags } from 'src/types/Tags';

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

registerEnumType(Tags, {
  name: 'Tags',
});
