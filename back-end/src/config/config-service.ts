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

