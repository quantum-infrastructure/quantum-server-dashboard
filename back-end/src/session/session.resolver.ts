import { SessionType } from './session.types';
import { SessionService } from './session.service';
// import { MutationReturnType, QueryReturnType } from "src/common/basic-response";
import { Arg, Ctx, Resolver } from 'type-graphql';
import {
  MutationReturnType,
  QueryReturnType,
} from '../basic-respones/basic-response';
import { ApolloRequestContext } from '../apollo/apollo';
import { Service } from 'typedi';
// import { IpAddress } from "src/common/decorators/ip-address";
import jwt, { SignOptions, VerifyErrors } from 'jsonwebtoken';

@Service()
@Resolver(() => SessionType)
export class SessionResolver {
  constructor(private sessionService: SessionService) {}

  @MutationReturnType((returns) => SessionType)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
  ) {
    const ddd = Date.now()
    const respone = await this.sessionService.generateToken(email, password);
    
    const ddd2 = Date.now()

    return {
      success: !!respone,
      data: respone,
	};
  }

  @QueryReturnType(() => SessionType)
  async getSession(@Arg('sessionToken') sessionToken: string,) {
    // const session = ctx.session.toSessionTye();
    const respone = await this.sessionService.verifySession(sessionToken);
    return {
      success: !!respone,
      data: respone,
	};
  }
}
