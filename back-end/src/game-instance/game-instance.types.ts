import { Field, InputType, ObjectType } from "type-graphql";


@InputType("GameInstanceDto")
@ObjectType("GameInstance")
export class GameInstanceType {
  @Field(() => String)
  id: string;

  @Field(() => String) 
  state: any;

  @Field(() => Number)
  timestamp: number;
}

