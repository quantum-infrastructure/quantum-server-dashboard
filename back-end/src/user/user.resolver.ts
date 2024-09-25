import { Arg, Resolver } from "type-graphql";
import { Service } from "typedi";
import { UserType } from "./user.types";
import { UserService } from "./user.service";
import { MutationReturnType  ,QueryReturnType} from "../basic-respones/basic-response";



@Service()
@Resolver(() => UserType)
export class UserResolver {
  constructor(
    private userService: UserService,
    // private sessionService: SessionService,
  ) {}

  

  
}
