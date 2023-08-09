import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ProjectResolver {
  @Query((returns) => String)
  hello() {
    return 'fvdv';
  }
}
