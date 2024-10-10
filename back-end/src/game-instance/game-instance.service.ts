import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";
import { GameInstanceType } from "./game-instance.types"; 
import { RedisService } from "../redis/redis.service";


@Service()
export class GameInstanceService {
  constructor(
    private readonly redisService: RedisService 
  ) {}

  async createGameInstance(gameInstanceData: GameInstanceType){
    const gameInstanceId = gameInstanceData.id!; 

    const timestamp = Date.now(); 
    const gameInstance: GameInstanceType = {
      id: gameInstanceData.id, 
      state: "{}",
      updated: timestamp, 
    };

    await this.redisService.redisClient.hSet(
      `${gameInstanceId}:game_instance`, 
      {
        ...gameInstance
      }
     
    );


   const d = await this.redisService.redisClient.zAdd('updated_game_instances', 
    {
      score: timestamp,
      value: `${gameInstanceId}:game_instance`
    }
    );


    return gameInstanceId; 
  }

  async getGameInstance(gameInstanceId: string): Promise<GameInstanceType | null> {
    const gameInstanceData = await this.redisService.redisClient.get(`${gameInstanceId}:game_instance`);
    
    if (!gameInstanceData) {
      return null; 
    }

    return JSON.parse(gameInstanceData) as GameInstanceType; 
  }

  async getAllGameInstances(): Promise<GameInstanceType[]> {

    // await this.redisService.redisClient.flushDb();

    // Retrieve all game instances
    //const keys = await this.redisService.redisClient.keys("game_instance:*");

    const keys = await this.redisService.redisClient.zRange("updated_game_instances", 0, 20);


    if(!keys.length){

      return [];

    }


    const results: GameInstanceType[] = [];

    // Loop through the keys and get their hashes
    for (const key of keys) {
        const hash = await this.redisService.redisClient.hGetAll(key);
        results.push(hash); // Store the hash with the key
    }

    return results;

    const gameInstancesResponse = await this.redisService.redisClient.mGet(keys);
    
    if(!gameInstancesResponse){
      return [];
    }
    
    const gameInstances = gameInstancesResponse.map((value, index) => {
      const key = keys[index];
      if (!key || !value) {
        return undefined;
      }
      const gameInstance = {
        ...JSON.parse(value),
      };
      return gameInstance;
    }).filter(val => val) as GameInstanceType[];

    

    return gameInstances; 
  }

  async deleteGameInstance(gameInstanceId: string): Promise<boolean> {
    const key = `${gameInstanceId}:game_instance`; 
    const result = await this.redisService.redisClient.del(key); 

    return result === 1;
  }






}
