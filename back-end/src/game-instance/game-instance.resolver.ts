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




import { Resolver, Query, Mutation, Arg } from "type-graphql"; // Import necessary decorators and types
import { Service } from "typedi"; // Import Service from typedi
import { GameInstanceService } from "./game-instance.service"; // Import your GameInstanceService
import { GameInstanceType } from "./game-instance.types"; // Import your GameInstanceType
import { MutationReturnType } from "../basic-respones/basic-response";

@Resolver(() => GameInstanceType) // Specify the class type to use as the resolver
@Service() // Register this class as a service
export class GameInstanceResolver {
  constructor(private readonly gameInstanceService: GameInstanceService) {}

  @MutationReturnType(() => Boolean) // Define a mutation that returns a string (the game instance ID)
  async createGameInstance(
    @Arg("id") id: string // Argument type for the mutation
    // @Arg("gameInstanceData") gameInstanceData: GameInstanceType // Argument type for the mutation
  ) {




    const create = this.gameInstanceService.createGameInstance(id)
    
    return {
        success: true,
        data : create
    }

  }

  @Query(() => GameInstanceType, { nullable: true }) // Define a query that returns a GameInstanceType or null
  async getGameInstance(
    @Arg("gameInstanceId") gameInstanceId: string // Argument type for the query
  ): Promise<GameInstanceType | null> {
    return this.gameInstanceService.getGameInstance(gameInstanceId); // Call the service method
  }

  @Query(() => [GameInstanceType]) // Define a query that returns an array of GameInstanceType
  async getAllGameInstances(): Promise<GameInstanceType[]> {

    console.log("BUBA")
    return this.gameInstanceService.getAllGameInstances(); // Call the service method
  }

  @Mutation(() => Boolean) // Define a mutation that returns a boolean (success status)
  async deleteGameInstance(
    @Arg("gameInstanceId") gameInstanceId: string // Argument type for the mutation
  ): Promise<boolean> {
    return this.gameInstanceService.deleteGameInstance(gameInstanceId); // Call the service method
  }
}
