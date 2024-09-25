import { Field, ObjectType } from 'type-graphql';
import { UserType } from '../user/user.types';

@ObjectType('Session')
export class SessionType {
  @Field((type) => String, { nullable: true })
  id?: string;

  @Field((type) => String, { nullable: true })
  sessionToken?: string;

  @Field((type) => UserType, { nullable: true })
  user?: UserType;
}

// @ObjectType('SessionLog')
// export class SessionLog {
//   @Field((type) => [SessionLogEntry])
//   data: SessionLogEntry[];

//   @Field((type) => Number)
//   totalCount: number;
// }
// @ObjectType('SessionLogEntry')
// export class SessionLogEntry {
//   @Field((type) => String, {
//     nullable: true,
//   })
//   id: string;

//   @Field((type) => Number, {
//     nullable: true,
//   })
//   lastActionDate: number;

//   @Field((type) => Number, {
//     nullable: true,
//   })
//   firstActionDate: number;

//   @Field((type) => String, {
//     nullable: true,
//   })
//   token: string;

//   @Field((type) => String, {
//     nullable: true,
//   })
//   userId: string;

//   @Field((type) => String, {
//     nullable: true,
//   })
//   ip: string;

//   @Field((type) => Date, {
//     nullable: true,
//   })
//   createdAt: Date;
// }
