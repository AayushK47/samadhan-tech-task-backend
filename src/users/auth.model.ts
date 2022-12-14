import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'users ' })
export class Auth {
  @Field()
  message: string;

  @Field({ nullable: true })
  token: string;
}