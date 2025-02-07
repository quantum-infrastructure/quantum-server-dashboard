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

import { Resolver, Query, Mutation, Arg, ObjectType, Field, Int } from "type-graphql";
import { Service } from "typedi";
import { GameInstanceService } from "./game-instance.service";
import { GameInstanceType } from "./game-instance.types";
import { MutationReturnType,QueryReturnType } from "../basic-respones/basic-response";





@ObjectType()
class GameInstanceResponsee {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => [GameInstanceType])
  data: GameInstanceType[];

}

@ObjectType()
class GameInstanceResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => [GameInstanceType])
  data: GameInstanceType[];

  @Field(() => Int) // Add this field
  totalCount: number;
}



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

  // @QueryReturnType(() => Boolean)
  // // @Query(() => [GameInstanceType])
  // async getAllGameInstances() {
  //   const a = this.gameInstanceService.getAllGameInstances();

  //   return {
  //     success : true,
  //     data : a
  //   }
  // }


  @Query(() => GameInstanceResponsee)
  async getAllGameInstancess(): Promise<GameInstanceResponsee> {
    const rawInstances = await this.gameInstanceService.getAllGameInstancess();

  // Convert raw objects to plain objects
  // const instances = rawInstances.map((instance) => {
  //   return {
  //     ...instance,
  //     id: instance.id || 'default-id', // Set a default id if missing
  //     state : instance.state || "{empty}",
  //     updated : instance.updated  || 1,

  //   };
  // });
  const instances1 = rawInstances.map((instance) => {
    return {
      ...instance,
    };
  });


  const instances = rawInstances.filter(instance => instance.id && instance.state);

    console.log(instances)

    return {
      success: true,
      data: instances,
    };
  }

  @Mutation(() => Boolean) //
  async deleteGameInstance(
    @Arg("gameInstanceId") gameInstanceId: string
  ): Promise<boolean> {
    return this.gameInstanceService.deleteGameInstance(gameInstanceId);
  }


  @Query(() => GameInstanceResponse)
async getAllGameInstances(
  @Arg("skip", () => Int, { defaultValue: 0 }) skip: number,
  @Arg("take", () => Int, { defaultValue: 5 }) take: number
): Promise<GameInstanceResponse> {
  const { data, totalCount } = await this.gameInstanceService.getAllGameInstances(skip, take);

  const instances = data.filter(instance => instance.id && instance.state);

  return {
    success: true,
    data: instances,
    totalCount,
  };
}






}
