
import { UserService } from '../user/user.service';


import { Service } from 'typedi';
import { UserType } from '../user/user.types';

import jwt, {
  SignOptions,
} from 'jsonwebtoken';
import { SessionType } from './session.types';

export class SessionEntity {
  sessionData?: {
    user?: UserType;
  };
}

export interface T {
  user?: UserType;
}

export interface SessionData {
  user?: UserType;
}

// Update the session entity to use the correct type
export class SessionEntity1 {
  sessionData?: SessionData;
}

const SALT = 'STATIC_SALT';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// JWT_SECRET=QqvY75gKaJslShOG6SWDGPhuMvl5ay8WcA1BQibv92M=

@Service()
export class SessionService {
  constructor(private readonly userService: UserService) {}

  async signToken(payload: UserType, options?: SignOptions) {
    return jwt.sign(payload, SECRET_KEY, options);
  }

  async generateToken(
    email: string,
    password: string,
  ): Promise<SessionType | null> {
    const user = await this.userService.getUserByEmailAndPassword(
      email,
      password,
    );

    if (!user) {
      return null;
    }

    const sessionToken = await this.signToken(user);
    return { id: 'session', user, sessionToken };
    // return null
  }

  async verifySession(sessionToken?: string): Promise<SessionType | null> {
    if (!sessionToken) {
      return null;
    }

    try {
      const session = await jwt.verify(sessionToken, SECRET_KEY) as {
        email: string;
        id: string;
      };

      if (!session || !session.email || !session.id) {
        return null;
      }

      const user = await this.userService.getUserByEmail(session.email);

      if(!user){
        return null;
      }
      return {
        user,
        sessionToken,
        id: 'session'
      };
    } catch (e) {
      return null;
    }
  }
}


// "scripts": {
//   "build": "tsc",
//   "watch": "tsc -w",
//   "test": "jest",
//   "cdk": "cdk"
// },