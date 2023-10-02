import { PrismaClient } from "@twatter/database"

import { ExpressContext } from "../../lib/express"

export type ResolverContext = ExpressContext & { prisma: PrismaClient }
