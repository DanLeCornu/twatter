import bcrypt from "bcryptjs"

import { prisma } from "../../lib/prisma"

prisma.$use(async (params, next) => {
  if (params.model !== "User") return next(params)
  if (params.action === "create" || params.action === "update") {
    // Hash password
    if (params.args.data.password) {
      params.args.data.password = await bcrypt.hash(params.args.data.password, 10)
    }
    // Lower & trim email
    if (params.args.data.email) {
      params.args.data.email = params.args.data.email.trim().toLowerCase()
    }
    // Lower & trim handle, remove @
    if (params.args.data.handle) {
      params.args.data.handle = params.args.data.handle.trim().toLowerCase().replace("@", "")
    }
  }
  return next(params)
})
