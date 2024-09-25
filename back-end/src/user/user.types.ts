import { Field, InputType, ObjectType, registerEnumType } from 'type-graphql';

@ObjectType('User')
export class UserType {
  // @Field((type) => String)
  // id: string;

  @Field()
  email: string;

  @Field()
  id: string;
}
