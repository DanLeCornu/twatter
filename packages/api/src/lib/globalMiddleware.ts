import * as Sentry from "@sentry/node"
import { AuthenticationError } from "apollo-server-express"
import chalk from "chalk"
import jwt from "jsonwebtoken"
import { ArgumentValidationError, MiddlewareFn } from "type-graphql"

import { AppError } from "./appError"
import { APP_AUTH_SECRET, IS_DEV } from "./config"
import { ExpressContext } from "./express"

const allowedFields = ["login", "refreshToken", "register", "token"]

// This intercepts the request and checks if a auth token is valid and if not throws specific auth error to
// be used to refresh the refresh token
export const TokenValidator: MiddlewareFn<ExpressContext> = async ({ info, context: { req } }, next) => {
  try {
    if (!req.headers.authorization || allowedFields.includes(info.fieldName)) return await next()
    const token = req.headers.authorization.split(" ")[1]
    try {
      jwt.verify(token, APP_AUTH_SECRET)
    } catch (error: any) {
      throw new AuthenticationError("Expired token")
    }
    return await next()
  } catch (err) {
    throw err
  }
}

export const ErrorInterceptor: MiddlewareFn = async ({}, next) => {
  try {
    return await next()
  } catch (err) {
    if (
      !(err instanceof ArgumentValidationError) &&
      !(err instanceof AppError) &&
      !(err instanceof AuthenticationError)
    ) {
      if (!IS_DEV) Sentry.captureException(err)
      console.log(`[${chalk.red("ERROR")}] `, err)
    }
    throw err
  }
}
