// import { Service } from "typedi";
// import { v4 as uuidv4 } from "uuid"; // For generating unique game instance IDs
// import { GameInstanceType, InitialStateType } from "./game-instance.types";
// import { RedisService } from "../redis/redis.service";

// @Service()
// export class GameInstanceService {
//   constructor(
//     private readonly redisService: RedisService // Inject RedisService
//   ) {}

//   async createGameInstance(
//     initialInput: string[], // Ensure initialInput is an array of strings
//     initialState: InitialStateType // Ensure initialState uses the custom type
//   ): Promise<string> {
//     const timestamp = Date.now();
//     const gameInstanceId = uuidv4(); // Generate a unique ID for the game instance

//     const gameInstance: GameInstanceType = {
//       initialInput,
//       initialState,
//       timestamp,
//     };

//     // Store the game instance in Redis with the unique ID
//     await this.redisService.redisClient.set(
//       `game-instance:${gameInstanceId}`, // Use a key prefix like 'game-instance:'
//       JSON.stringify(gameInstance) // Store the game instance as a JSON string
//     );

//     console.log(gameInstance)

//     return gameInstanceId; // Return the unique ID for reference
//   }

//   async getGameInstance(gameInstanceId: string): Promise<GameInstanceType | null> {
//     const gameInstanceData = await this.redisService.redisClient.get(`game-instance:${gameInstanceId}`);

//     if (!gameInstanceData) {
//       return null; // Return null if no game instance is found
//     }

//     return JSON.parse(gameInstanceData) as GameInstanceType; // Deserialize and return the game instance
//   }

//   async getAllGameInstances(): Promise<any[]> {
//     // Retrieve all game instances
//     const keys = await this.redisService.redisClient.keys("game_instance:*");
//     const gameInstancesResponse = await this.redisService.redisClient.mGet(keys);
//     const gameInstances  =gameInstancesResponse.map((value,index)=>{
//       const key = keys[index];
//       if(!key || !value){
//         return undefined;
//       }
//       const gameInstance = {
//         ...JSON.parse(value),
//         id: key
//       }
//       return gameInstance;
//     }).filter(val => val)
//     return gameInstances;
//   }

//   async deleteGameInstance(gameInstanceId: string): Promise<boolean> {
//     const key = `game-instance:${gameInstanceId}`; // Match the key format used in create
//     const result = await this.redisService.redisClient.del(key); // Delete the key from Redis

//     return result === 1; // Return true if the instance was deleted, false otherwise
//   }

// }

import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid"; // For generating unique game instance IDs
import { GameInstanceType } from "./game-instance.types"; // Ensure these imports are correct
import { RedisService } from "../redis/redis.service";
import { getGameInstanceKey, getUpdatedGameInstancesKey } from "../common/access-patterns/access-patterns";

@Service()
export class GameInstanceService {
  constructor(
    private readonly redisService: RedisService // Inject RedisService
  ) {}

  async createGameInstance(gameInstanceId: string) {

    const gameInstanceKey = getGameInstanceKey(gameInstanceId);
    const timestamp = Date.now();
    const gameInstance: GameInstanceType = {
      id: gameInstanceId, // Set the generated ID
      state: "{}", // Use the provided state
      timestamp: timestamp, // Store the current timestamp
    };

    // Store the game instance in Redis with the unique ID
    await this.redisService.redisClient.set(
      gameInstanceKey, // Use a key prefix like 'game-instance:'
      JSON.stringify(gameInstance) // Store the game instance as a JSON string
    );
    await this.redisService.redisClient.zAdd(getUpdatedGameInstancesKey(), {
      score: timestamp,
      value: gameInstanceKey,
    });


    return gameInstanceId; // Return the unique ID for reference
  }

  async getGameInstance(
    gameInstanceId: string
  ): Promise<GameInstanceType | null> {
    const gameInstanceData = await this.redisService.redisClient.get(
      `game-instance:${gameInstanceId}`
    );

    if (!gameInstanceData) {
      return null; // Return null if no game instance is found
    }

    return JSON.parse(gameInstanceData) as GameInstanceType; // Deserialize and return the game instance
  }

  async getAllGameInstances(): Promise<GameInstanceType[]> {
    // Retrieve all game instances
    const keys = await this.redisService.redisClient.keys("game-instance:*");
    const gameInstancesResponse = await this.redisService.redisClient.mGet(
      keys
    );

    const gameInstances = gameInstancesResponse
      .map((value, index) => {
        const key = keys[index];
        if (!key || !value) {
          return undefined;
        }
        const gameInstance = {
          ...JSON.parse(value),
          id: key.split(":")[1], // Extract the ID from the key
        };
        return gameInstance;
      })
      .filter(val => val) as GameInstanceType[]; // Filter out undefined values

    return gameInstances; // Return the array of game instances
  }

  async deleteGameInstance(gameInstanceId: string): Promise<boolean> {
    const key = `game-instance:${gameInstanceId}`; // Match the key format used in create
    const result = await this.redisService.redisClient.del(key); // Delete the key from Redis

    return result === 1; // Return true if the instance was deleted, false otherwise
  }
}
