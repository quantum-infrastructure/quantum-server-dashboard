import { createClient, RedisClientType } from "redis";
import { Service } from "typedi";
import { ConfigService } from "../config/config-service";

@Service()
export class RedisService {
  constructor(private readonly configService: ConfigService) {}

  public redisClient: RedisClientType;

  public init = async () => {
    const redisUrl =
      this.configService.redis.redisHost && this.configService.redis.redisPort
        ? `redis://${this.configService.redis.redisHost}:${this.configService.redis.redisPort}`
        : undefined;

    this.redisClient = createClient({
      url: redisUrl || "redis://localhost:6379",
    });

    await this.redisClient.connect();

    // Handle connection errors
    this.redisClient.on('error', (err: any) => console.error('Redis Client Error', err));
  };
  
}
