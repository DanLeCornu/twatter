import * as glob from "glob"

// RESOLVER PATHS
export const RESOLVER_PATHS = "/modules/**/*resolver.{js,ts}"

export type NonEmptyArray<TItem> = readonly [TItem, ...TItem[]] | [TItem, ...TItem[]]
export type Resolvers = NonEmptyArray<Function>

export function loadResolvers(): Resolvers {
  const filePaths = glob.globSync(__dirname + "../../" + RESOLVER_PATHS)
  const modules: { default: Function }[] = filePaths.map(require)
  return modules
    .flatMap((module) => {
      const resolvers = []
      if (module.default) resolvers.push(module.default)
      return resolvers
    })
    .filter(Boolean) as Resolvers
}
