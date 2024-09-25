import { SessionEntity, SessionService } from './session.service';
import { SessionType } from './session.types';
import Container, { Service } from 'typedi';
// import { Errors } from '../error/errors';

import { Request, Response, NextFunction } from 'express';
import jwt, {
  SignOptions,
  TokenExpiredError,
  VerifyErrors,
} from 'jsonwebtoken';

export interface SessionRequest extends Request {
  session?: SessionInstance;
}


const sessionService = Container.get(SessionService);


export const sessionMiddleware = async (
  req: SessionRequest,
  res: Response,
  next: () => void,
) => {
  req.session = undefined;
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    req.session = await SessionInstance.getInstance(sessionService);
    return next();
  }
  const token = authHeader.split(' ')[1];

  req.session = await SessionInstance.getInstance(sessionService, token);
  return next();
};

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

@Service()
export class SessionInstance extends SessionEntity {
  private constructor(private readonly sessionService: SessionService) {
    super();
  }

  sessionToken?: string;


  static async getInstance(
    sessionService: SessionService,
    sessionToken?: string,
  ) {

    
    const sessionInstance = new SessionInstance(sessionService);
    

    if (sessionToken) {
      sessionInstance.sessionToken = sessionToken;
      await sessionInstance.loadSession();
    }

    if (!sessionInstance.sessionData) {
      sessionInstance.sessionData = {
        user: undefined,
      };
    }

    return sessionInstance;
  }

  async loadSession(token?: string) {
    if (token) {
      this.sessionToken = token;
    }
    const session = await this.sessionService.verifySession(this.sessionToken);
    if (session) {
      Object.assign(this, session);
    } else {
      this.sessionToken = undefined;
      this.sessionData = {
        user: undefined,
      };
    }

    return this;
  }

  toSessionType(): SessionType {

    if (this.sessionData?.user && this.sessionToken) {
      return {
        id: 'session',
        sessionToken: this.sessionToken,
        user: this.sessionData.user,
      };
    }
    return {
      user: undefined,
      id: 'session',
      sessionToken: undefined,
    };
  }
}
