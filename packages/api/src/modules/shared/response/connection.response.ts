import { ClassType, Field, Int, ObjectType } from "type-graphql"

export function ConnectionResponse<TItem>(getNodesType: () => [ClassType<TItem>]) {
  @ObjectType()
  abstract class ConnectionResponseClass {
    @Field(() => Int) count: number
    @Field(getNodesType) items: TItem[]
  }
  return ConnectionResponseClass
}
