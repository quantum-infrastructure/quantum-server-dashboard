// import { Arg, Mutation, Query, Resolver } from "type-graphql";
// import { Inject, Service } from "typedi";
//  import { GameInstanceType, InitialStateType } from "./game-instance.types";
//  import { GameInstanceService } from "./game-instance.service";

// @Service()
//  @Resolver(GameInstanceType)
// export class GameInstanceResolver {
//   constructor(
//     @Inject(() => GameInstanceService)
//     private readonly gameInstanceService: GameInstanceService
//   ) {}

//   // Mutation to create a new game instance
//   @Mutation(() => String)
//   async createGameInstance(
//     @Arg("initialInput", () => [String]) initialInput: string[], // Specify as an array of strings
//     @Arg("initialState", () => InitialStateType) initialState: InitialStateType // Use the InputType for initialState
//   ): Promise<string> {
//     const gameInstanceId = await this.gameInstanceService.createGameInstance(initialInput, initialState);
//     return gameInstanceId;
//   }

//   // Query to retrieve an existing game instance by ID
//   @Query(() => GameInstanceType, { nullable: true })
//   async getGameInstance(
//     @Arg("gameInstanceId") gameInstanceId: string
//   ): Promise<GameInstanceType | null> {
//     const gameInstance = await this.gameInstanceService.getGameInstance(gameInstanceId);
//     return gameInstance;
//   }

//   @Query(() => [GameInstanceType]) // Returns an array of GameInstanceType
//   async getAllGameInstances(): Promise<GameInstanceType[]> {
//     const gameInstances = await this.gameInstanceService.getAllGameInstances();
//     return gameInstances;
//   }

//   @Mutation(() => Boolean)
//   async deleteGameInstance(
//     @Arg("gameInstanceId") gameInstanceId: string
//   ): Promise<boolean> {
//     const deleted = await this.gameInstanceService.deleteGameInstance(gameInstanceId);
//     return deleted; // Return true if deleted, false if not found
//   }

// }

import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Service } from "typedi";
import { GameInstanceService } from "./game-instance.service";
import { GameInstanceType } from "./game-instance.types";
import { MutationReturnType } from "../basic-respones/basic-response";

@Resolver(() => GameInstanceType)
@Service()
export class GameInstanceResolver {
  constructor(private readonly gameInstanceService: GameInstanceService) {}

  @MutationReturnType(() => Boolean)
  async createGameInstance(
    @Arg("id") id: string
    // @Arg("gameInstanceData") gameInstanceData: GameInstanceType
  ) {
    const create = this.gameInstanceService.createGameInstance({ id });

    return {
      success: true,
      data: create,
    };
  }

  @Query(() => GameInstanceType, { nullable: true })
  async getGameInstance(
    @Arg("gameInstanceId") gameInstanceId: string
  ): Promise<GameInstanceType | null> {
    return this.gameInstanceService.getGameInstance(gameInstanceId);
  }

  @Query(() => [GameInstanceType])
  async getAllGameInstances(): Promise<GameInstanceType[]> {
    return this.gameInstanceService.getAllGameInstances();
  }

  @Mutation(() => Boolean) //
  async deleteGameInstance(
    @Arg("gameInstanceId") gameInstanceId: string
  ): Promise<boolean> {
    return this.gameInstanceService.deleteGameInstance(gameInstanceId);
  }
}
