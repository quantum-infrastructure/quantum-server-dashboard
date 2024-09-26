import 'reflect-metadata';
import { getApp } from './app';
import awsServerlessExpress from 'aws-serverless-express';
import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';

// Flag to check if the environment is Lambda or local
const isLambda = !!process.env.AWS_LAMBDA_FUNCTION_NAME;

// Lambda server instance (for AWS deployment)
let server: any;

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  // if (!server) {
  //   const app = await getApp(); // Get the Express app
  //   server = awsServerlessExpress.createServer(app); // Create the Lambda server
  // }

  // return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
  return awsServerlessExpress.proxy(awsServerlessExpress.createServer(await getApp()), event, context, 'PROMISE').promise;

};

// Run the server locally if not in Lambda environment
if (!isLambda) {
  (async () => {
    const app = await getApp();

    app.listen(4000, () => {
      console.log('Server ready on port 4000');
    });
  })();
}