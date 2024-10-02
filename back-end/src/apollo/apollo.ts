import { ApolloServer, BaseContext } from '@apollo/server';
import { buildTypeDefsAndResolvers } from 'type-graphql';
import { Container } from 'typedi';
import { FileResolver } from '../file/file.resolver';
import { SessionResolver } from '../session/session.resolver';
import { UserResolver } from '../user/user.resolver';
import { SessionInstance } from '../session/session.middleware';
import { GameInstanceResolver } from '../game-instance/game-instance.resolver';
import { RedisService } from '../redis/redis.service';

export interface ApolloRequestContext extends BaseContext {
  session: SessionInstance; 
  ip: string;
}

export const getApolloServer = async () => {
  await Container.get(RedisService).init();
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [FileResolver, UserResolver, SessionResolver,GameInstanceResolver],
    container: Container,
  });

  const server = new ApolloServer<ApolloRequestContext>({
    typeDefs,
    resolvers,
  });

  await server.start();
  return server;
};