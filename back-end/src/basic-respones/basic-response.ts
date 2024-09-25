import {
  Field,
  Mutation,
  ObjectType,
  Query,
  getMetadataStorage,
  registerEnumType,
} from "type-graphql";
import {
  AdvancedOptions,
  EnumConfig,
  ReturnTypeFuncValue,
} from "type-graphql/build/typings/decorators/types";
// import { DefaultError } from "../error/errors";

export function registerGraphQLEnumType<TEnum extends object>(
  enumObj: TEnum,
  enumConfig: EnumConfig<TEnum>
) {
  const exists = getMetadataStorage().enums.find((en) => {
    return en.name == enumConfig.name;
  });

  if (!exists) {
    registerEnumType(enumObj, enumConfig);
  }
}

const getSavedTarget = (typeName: string) => {
  const existingObjectType = TypeGraphQLMetadataStorage.objectTypes.find(
    (metadata) => {
      return metadata.name === typeName;
    }
  );
  return existingObjectType;
};

export function MutationReturnType(
  typeFunc: (returns?: void | undefined) => ReturnTypeFuncValue,
  options?: AdvancedOptions | undefined
) {
  return generateReturnType("Mutation", typeFunc, options);
}

export function QueryReturnType(
  typeFunc?: (returns?: void | undefined) => ReturnTypeFuncValue,
  options?: AdvancedOptions | undefined
) {
  return generateReturnType("Query", typeFunc, options);
}

export function generateReturnType(
  annotationType: "Query" | "Mutation",
  typeFunc?: (returns?: void) => ReturnTypeFuncValue,
  options?: AdvancedOptions
) {
  return function (target: any, propertyKey: any, descriptor: any): void {
    const annotation = annotationType === "Query" ? Query : Mutation;

    if (!typeFunc || !typeFunc()) {
      annotation(() => BaseResponse, options)(target, propertyKey, descriptor);
    } else {
      let type = typeFunc();
      let arrayName = "";
      if (typeof type === "object") {
        // type = type[0];
        type = Array.isArray(type) ? type[0] : type;

        arrayName = "Array";
      }
      const responseObjectTypeName = `${(type as any).name.toString()}${arrayName}Response`;
      const existingObjectType = getSavedTarget(responseObjectTypeName);
      // if the type with this name is already created return it, if not return the newly created one
      if (existingObjectType) {
        annotation(() => existingObjectType.target, options)(
          target,
          propertyKey,
          descriptor
        );
      } else {
        if (arrayName) {
          @ObjectType(responseObjectTypeName)
          class cls extends ArrayResponseType(type) {}
          annotation(() => cls, options)(target, propertyKey, descriptor);
        } else {
          @ObjectType(responseObjectTypeName)
          class cls extends ResponseType(type) {}

          annotation(() => cls, options)(target, propertyKey, descriptor);
        }
      }
    }
  };
}

@ObjectType(`BaseResponse`)
class BaseResponse {
  @Field()
  success: boolean;

  // @Field(() => DefaultError, { nullable: true })
  // error?: DefaultError;
}

export function ResponseType<T extends ReturnTypeFuncValue>(classRef: T): any {
  @ObjectType(`BaseResponse${(classRef as any).name}`)
  class BaseResponseWithData extends BaseResponse {
    @Field((type) => classRef, { nullable: true })
    data?: T;
  }
  return BaseResponseWithData;
}

export function ArrayResponseType<T extends ReturnTypeFuncValue>(
  classRef: T
): any {

  @ObjectType(`BaseResponseWithArray${(classRef as any).name}`)
  class BaseResponseWithArray extends BaseResponse {
    @Field((type) => [classRef], { nullable: true })
    data?: T[];

    @Field({ nullable: true })
    totalCount?: number;
  }

  return BaseResponseWithArray;
}
