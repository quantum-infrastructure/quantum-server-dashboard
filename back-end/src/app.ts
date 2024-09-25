import 'reflect-metadata';
import cors from 'cors';
const dotenv = require('dotenv');
dotenv.config();
import { expressMiddleware } from '@apollo/server/express4';
// import { SessionRequest, sessionMiddleware } from "./sessions/session.middleware";
import express, { Express } from 'express';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServer } from '@apollo/server';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import {
  SessionRequest,
  sessionMiddleware,
} from './session/session.middleware';
import { getApolloServer } from './apollo/apollo';

// import { graphqlUploadExpress } from "graphql-upload-ts";

// export const getApp = async () => {
//   const expressServer = express();
 

//   // expressServer.get('/gg', (req, res) => {
//   //   res.send('HH');
//   // });
//   const apolloServer = await getApolloServer();
//   expressServer.use(sessionMiddleware);

//   expressServer.use(
//     graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
//   );

//   // expressServer.use(cors());

//   expressServer.use(
//     '/graphql',
//     cors<cors.CorsRequest>(),
//     express.json(),
//     expressMiddleware(apolloServer as any, {
//       context: async ({ req }: { req: SessionRequest }) => ({
//         session: req.session,
//         ip:
//           req?.headers['cf-connecting-ip'] ||
//           req?.headers['x-real-ip'] ||
//           req?.headers['x-forwarded-for'] ||
//           req?.socket.remoteAddress ||
//           '',
//       }),
//     }),
//   );

//   return expressServer;
// };



export const getApp = async () => {
  const expressServer = express();

  // Define a basic route for `/`
  expressServer.get('/', (req, res) => {
    res.send('Hello, this is the root endpoint!');
  });

  const apolloServer = await getApolloServer();
  expressServer.use(sessionMiddleware);

  expressServer.use(
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  );

  expressServer.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer as any, {
      context: async ({ req }: { req: SessionRequest }) => ({
        session: req.session,
        ip:
          req?.headers['cf-connecting-ip'] ||
          req?.headers['x-real-ip'] ||
          req?.headers['x-forwarded-for'] ||
          req?.socket.remoteAddress ||
          '',
      }),
    }),
  );

  return expressServer;
};