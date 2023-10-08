import bcrypt from "bcryptjs"
import { Service } from "typedi"

import { UserWhereInput } from "@twatter/database/dist/generated"

import { AppError } from "../../lib/appError"
import { createAuthToken, createRefreshToken } from "../../lib/jwt"
import { prisma } from "../../lib/prisma"
import { LoginInput } from "./inputs/login.input"
import { RefreshTokenResponse } from "./responses/refreshToken.response"
import { User } from "./user.model"

@Service()
export class UserService {
  async login(data: LoginInput): Promise<User> {
    const user = await prisma.user.findUnique({ where: { email: data.email } })
    if (!user || !user.password) throw new AppError("Incorrect email or password")
    const isValidPassword = await bcrypt.compare(data.password, user.password)
    if (!isValidPassword) throw new AppError("Incorrect email or password")
    return user
  }

  async register(data: { email: string; name: string; dob: string }) {
    const email = data.email.toLowerCase().trim()
    await checkUserExists({ email: { equals: email } })
    const user = await prisma.user.create({ data })
    return user
  }

  createAuthTokens(user: User): RefreshTokenResponse {
    const token = createAuthToken({ id: user.id })
    const refreshToken = createRefreshToken({ id: user.id })
    return { token, refreshToken }
  }
}

export async function checkUserExists(where: UserWhereInput) {
  const user = await prisma.user.findFirst({ where })
  if (user) {
    throw new AppError(
      where.email
        ? "Email has already been taken"
        : where.handle
        ? "Username has already been taken"
        : "An account with these details already exists",
    )
  }
}
