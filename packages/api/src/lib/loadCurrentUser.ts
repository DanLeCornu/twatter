import { ExpressRequest } from "./express"
import { prisma } from "./prisma"

export async function loadCurrentUser(req: ExpressRequest, __: any, next: any) {
  if (req.auth) {
    const user = await prisma.user.findUnique({ where: { id: req.auth.id } })
    if (user && !!!user.archivedAt) {
      req.currentUser = user
    }
  }
  return next()
}
