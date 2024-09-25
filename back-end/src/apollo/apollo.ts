import { ApolloServer, BaseContext } from '@apollo/server';
import { buildTypeDefsAndResolvers } from 'type-graphql';
import { Container } from 'typedi';
import { FileResolver } from '../file/file.resolver';
import { SessionResolver } from '../session/session.resolver';
import { UserResolver } from '../user/user.resolver';
import { SessionInstance } from '../session/session.middleware';

export interface ApolloRequestContext extends BaseContext {
  session: SessionInstance; 
  ip: string;
}

export const getApolloServer = async () => {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [FileResolver, UserResolver, SessionResolver],
    container: Container,
  });

  const server = new ApolloServer<ApolloRequestContext>({
    typeDefs,
    resolvers,
  });

  await server.start();
  return server;
};