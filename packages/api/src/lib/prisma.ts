import chalk from "chalk"

import { PrismaClient } from "@twatter/database"

import { DATABASE_URL, NODE_ENV } from "./config"

export const prisma = new PrismaClient({ log: ["warn", "error"] })

if (NODE_ENV === "development" && !DATABASE_URL.includes("localhost")) {
  console.log(
    `${chalk.red(
      ` \n\n
        ----------- WARNING -----------
        \n\n
        You are using a non-development database. Be careful.
        \n\n`,
    )}`,
  )
}
