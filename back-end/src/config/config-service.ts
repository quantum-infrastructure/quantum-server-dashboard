import { Service } from "typedi";

export enum SLS_STAGE_ENV {
	local = "local",
	dev = "dev",
	staging = "staging",
	prod = "prod",
}

const slsEnv = Object.values(SLS_STAGE_ENV).includes(
	process.env.SLS_STAGE_ENV as SLS_STAGE_ENV,
)
	? (process.env.SLS_STAGE_ENV as SLS_STAGE_ENV)
	: SLS_STAGE_ENV.dev;

@Service()
export class ConfigService {
	environment: SLS_STAGE_ENV = slsEnv;
	migrationDatabase = {
		host: process.env.MIGRATION_DATABASE_HOST,
		port: process.env.MIGRATION_DATABASE_PORT?parseInt(process.env.MIGRATION_DATABASE_PORT, 10) : 5432,
		dbName: process.env.MIGRATION_DATABASE_NAME,
		username: process.env.MIGRATION_DATABASE_USER,
		password: process.env.MIGRATION_DATABASE_PASSWORD,
	};
	database = {
		host: process.env.DATABASE_HOST,
		port: process.env.DATABASE_PORT?parseInt(process.env.DATABASE_PORT, 10) : 5432,
		dbName: process.env.DATABASE_NAME,
		username: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
		entityPrefix: process.env.DATABASE_ENTITY_PREFIX || "",
	};
	dynamoDB = {
	dynamoDBRegion : process.env.DYNAMO_DB_REGION,
	dynamoDBTableName : process.env.DYNAMO_DB_TABLE_NAME,
	dynamoDBUrl : process.env.DYNAMO_DB_URL,
	};
	user = {
		userEmail : process.env.USER_EMAIL,
		userPassword : process.env.USER_PASSWORD
	};
	fileService = {
		awsAccessKey: process.env.CREDENTIALS_AWS_ACCESS_KEY,
		awsSecretKey: process.env.CREDENTIALS_AWS_SECRET_KEY,
		url: process.env.FILE_SERVER_URL,
		secretKey: process.env.FILE_SERVER_KEY,
	};
	


}

