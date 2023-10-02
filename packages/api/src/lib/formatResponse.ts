import type { GraphQLRequestContext, GraphQLResponse } from "apollo-server-types"

export function formatResponse(
  res: GraphQLResponse | null,
  context: GraphQLRequestContext<any>,
): GraphQLResponse {
  console.log(
    (context.operation?.operation ? `${context.operation.operation.toUpperCase()}: ` : "") +
      context.operationName,
  )
  if (!res) throw Error("No response")
  return res
}
