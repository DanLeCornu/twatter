import "reflect-metadata"

import { ApolloServerPluginCacheControl, ApolloServerPluginLandingPageDisabled } from "apollo-server-core"
import { ApolloServer } from "apollo-server-express"
import { expressjwt as jwt } from "express-jwt"
import { useContainer, useExpressServer } from "routing-controllers"
import { buildSchema } from "type-graphql"
import { Container } from "typedi"

import { APP_AUTH_SECRET, CONTROLLER_PATHS } from "./lib/config"
import { ExpressContext } from "./lib/express"
import { formatResponse } from "./lib/formatResponse"
import { ErrorInterceptor, TokenValidator } from "./lib/globalMiddleware"
import { loadPrismaHooks } from "./lib/hooks"
import { loadCurrentUser } from "./lib/loadCurrentUser"
import { loadResolvers } from "./lib/loadResolvers"
import { prisma } from "./lib/prisma"
import { Server } from "./lib/server"

class App extends Server {
  constructor() {
    super()
    this.init().catch(async (error) => {
      this.logger.error(error)
      await prisma.$disconnect()
      process.exit(1)
    })
  }

  async init() {
    await this.setUpDb()
    await this.setUpAuth()
    await this.setupApollo()
    await this.setupControllers()
    this.start()
  }
  async setUpDb() {
    await prisma.$connect()
    loadPrismaHooks()
    this.logger.info("DB ready")
  }

  async setUpAuth() {
    this.app
      .use(jwt({ secret: APP_AUTH_SECRET, credentialsRequired: false, algorithms: ["HS256"] }))
      .use((err: any, _: any, __: any, next: any) => {
        if (err.name === "UnauthorizedError") next()
      })
      .use(loadCurrentUser)
    this.logger.info("Auth ready")
  }

  async setupApollo() {
    const schema = await buildSchema({
      container: Container,
      validate: { forbidUnknownValues: false },
      resolvers: loadResolvers(),
      globalMiddlewares: [TokenValidator, ErrorInterceptor],
    })
    const apolloServer = new ApolloServer({
      csrfPrevention: true,
      context: ({ req, res }: ExpressContext) => ({ req, res, prisma }),
      formatResponse,
      plugins: [ApolloServerPluginCacheControl(), ApolloServerPluginLandingPageDisabled()],
      schema,
      introspection: true,
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({ app: this.app, cors: true })
    this.logger.info("Apollo setup")
  }

  async setupControllers() {
    useContainer(Container)
    useExpressServer(this.app, {
      routePrefix: "/api",
      controllers: [__dirname + CONTROLLER_PATHS],
    })
    this.logger.info("Controllers ready")
  }
}

new App()
