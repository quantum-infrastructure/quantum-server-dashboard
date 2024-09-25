import { Field, InputType, registerEnumType } from "type-graphql";

export enum SortingOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

@InputType()
class SortColumn {
  @Field({ nullable: false })
  columnName: string;

  @Field(() => SortingOrder, { nullable: false })
  order: SortingOrder;
}

@InputType()
export class SortType {
  @Field(() => SortColumn, { nullable: true })
  sortColumns?: SortColumn;
}

registerEnumType(SortingOrder, {
  name: 'SortingOrder',
});
