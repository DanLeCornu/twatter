import bcrypt from "bcryptjs"
import { Arg, Args, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { Inject, Service } from "typedi"

import {
  CreateOneUserArgs,
  FindFirstUserArgs,
  FindManyUserArgs,
  Role,
} from "@twatter/database/dist/generated"

import { AppError } from "../../lib/appError"
import { IS_DEV } from "../../lib/config"
import { createToken, decodeRefreshToken, decodeToken } from "../../lib/jwt"
import { prisma } from "../../lib/prisma"
import { ContextUser } from "../shared/contextUser"
import { CurrentUser } from "../shared/currentUser"
import { UseAuth } from "../shared/middleware/UseAuth"
import { ResolverContext } from "../shared/resolverContext"
import { VerifyInput } from "../verification/inputs/verify.input"
import { DeactivateAccountInput } from "./inputs/deactivateAccount.input"
import { LoginInput } from "./inputs/login.input"
import { RegisterInput } from "./inputs/register.input"
import { ResetPasswordInput } from "./inputs/resetPassword.input"
import { UpdatePasswordInput } from "./inputs/updatePassword.input"
import { UpdateUserInput } from "./inputs/updateUser.input"
import { AuthResponse } from "./responses/auth.response"
import { RefreshTokenResponse } from "./responses/refreshToken.response"
import { UsersResponse } from "./responses/users.response"
import { sendResetPasswordLink } from "./user.mailer"
import { User } from "./user.model"
import { checkUserExists, UserService } from "./user.service"

@Service()
@Resolver(() => User)
export default class UserResolver {
  @Inject(() => UserService)
  userService: UserService

  @UseAuth()
  @Query(() => User, { nullable: true })
  async user(@Args() args: FindFirstUserArgs): Promise<User | null> {
    return await prisma.user.findFirst({ ...(args as any), where: { ...args.where, archivedAt: null } })
  }

  // @UseAuth([Role.ADMIN])
  @Query(() => UsersResponse)
  async users(@Args() args: FindManyUserArgs): Promise<UsersResponse> {
    const items = await prisma.user.findMany({ ...(args as any), where: { ...args.where, archivedAt: null } })
    const count = await prisma.user.count({
      ...(args as any),
      where: { ...args.where, archivedAt: null },
      take: undefined,
      skip: undefined,
    })
    return { items, count }
  }

  // CREATE USER
  @UseAuth([Role.ADMIN])
  @Mutation(() => User)
  async createUser(@Args() args: CreateOneUserArgs): Promise<User> {
    return await prisma.user.create(args)
  }

  // ME
  @Query(() => User, { nullable: true })
  me(@ContextUser() user: ContextUser): User | null {
    return user
  }

  // UPDATE ME
  @UseAuth()
  @Mutation(() => User)
  async updateMe(@CurrentUser() currentUser: User, @Arg("data") data: UpdateUserInput): Promise<User> {
    if (data.email) await checkUserExists({ email: { equals: data.email } }, currentUser)
    if (data.handle) await checkUserExists({ handle: { equals: data.handle } }, currentUser)
    return await prisma.user.update({ where: { id: currentUser.id }, data })
  }

  // LOGIN
  @Mutation(() => AuthResponse)
  async login(@Arg("data") data: LoginInput, @Ctx() context: ResolverContext): Promise<AuthResponse> {
    const user = await this.userService.login(data)
    const tokens = this.userService.createAuthTokens(user)
    context.req.auth = user
    context.req.currentUser = user
    return { user, ...tokens }
  }

  // LOGOUT
  @UseAuth()
  @Mutation(() => Boolean)
  async logout(@CurrentUser() currentUser: User): Promise<boolean> {
    // await this.activityService.createLogout({ user })
    return true
  }

  // REFRESH TOKEN
  @Query(() => RefreshTokenResponse, { nullable: true })
  async refreshToken(@Arg("refreshToken") refreshToken: string): Promise<RefreshTokenResponse | null> {
    let id: string | undefined
    try {
      id = decodeRefreshToken<{ id: string }>(refreshToken).id
    } catch {
      return null
    }
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) return null
    const tokens = this.userService.createAuthTokens(user)
    return tokens
  }

  // VERIFY
  @Mutation(() => Boolean)
  async verify(@Arg("data") data: VerifyInput): Promise<Boolean> {
    const email = data.email.toLowerCase().trim()
    await checkUserExists({ email: { equals: email } })
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    if (IS_DEV) console.log("CODE:", verificationCode)
    await prisma.verification.create({ data: { ...data, verificationCode } })
    return true
  }

  // REGISTER
  @Mutation(() => AuthResponse)
  async register(@Arg("data") data: RegisterInput, @Ctx() context: ResolverContext): Promise<AuthResponse> {
    const { email, verificationCode } = data
    const verification = await prisma.verification.findFirst({
      where: { email, verifiedAt: null },
      orderBy: { createdAt: "desc" },
    })
    if (verification?.verificationCode !== verificationCode) throw new AppError("Incorrect verification code")

    const user = await this.userService.register({ email, name: verification.name, dob: verification.dob })
    await prisma.verification.update({ where: { id: verification.id }, data: { verifiedAt: new Date() } })
    const tokens = this.userService.createAuthTokens(user)
    context.req.auth = user
    context.req.currentUser = user
    return { user, ...tokens }
  }

  // FORGOT PASSWORD
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({ where: { email } })
    if (user) {
      console.log(user.email)
      const token = createToken({ id: user.id })
      void sendResetPasswordLink(user, token)
    }
    return true
  }

  // DEACTIVATE ACCOUNT
  @Mutation(() => Boolean)
  async deactivateAccount(
    @CurrentUser() currentUser: User,
    @Arg("data") data: DeactivateAccountInput,
  ): Promise<boolean> {
    if (!currentUser.password) throw new AppError("Incorrect password")
    const isValidPassword = await bcrypt.compare(data.password, currentUser.password)
    if (!isValidPassword) throw new AppError("Incorrect password")
    await prisma.user.update({ where: { id: currentUser.id }, data: { archivedAt: new Date() } })
    return true
  }

  // RESET PASSWORD
  @Mutation(() => Boolean)
  async resetPassword(@Arg("data") data: ResetPasswordInput): Promise<boolean> {
    try {
      const payload = decodeToken<{ id: string }>(data.token)
      const user = await prisma.user.update({ where: { id: payload.id }, data: { password: data.password } })
      console.log(user.email)
      // TODO: mailer
      // sendPasswordChanged(user)
      return true
    } catch (error) {
      return false
    }
  }

  // UPDATE PASSWORD
  @Mutation(() => Boolean)
  async updatePassword(
    @CurrentUser() currentUser: User,
    @Arg("data") data: UpdatePasswordInput,
  ): Promise<boolean> {
    try {
      if (!currentUser.password) throw new AppError("Incorrect password")
      const isValidPassword = await bcrypt.compare(data.currentPassword, currentUser.password)
      if (!isValidPassword) throw new AppError("Incorrect password")
      await prisma.user.update({ where: { id: currentUser.id }, data: { password: data.newPassword } })
      return true
    } catch (error) {
      throw new AppError("Incorrect password")
    }
  }

  // FOLLOW USER
  @Mutation(() => Boolean)
  async followUser(@CurrentUser() currentUser: User, @Arg("userId") userId: string): Promise<boolean> {
    if (currentUser.id === userId) throw new AppError("You can't follow yourself")
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { following: { connect: { id: userId } } },
    })
    return true
  }

  // UNFOLLOW USER
  @Mutation(() => Boolean)
  async unfollowUser(@CurrentUser() currentUser: User, @Arg("userId") userId: string): Promise<boolean> {
    if (currentUser.id === userId) throw new AppError("You can't unfollow yourself")
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { following: { disconnect: { id: userId } } },
    })
    return true
  }

  // MUTE USER
  @Mutation(() => Boolean)
  async muteUser(@CurrentUser() currentUser: User, @Arg("userId") userId: string): Promise<boolean> {
    if (currentUser.id === userId) throw new AppError("You can't mute yourself")
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { mutedAccounts: { connect: { id: userId } } },
    })
    return true
  }

  // UNMUTE USER
  @Mutation(() => Boolean)
  async unmuteUser(@CurrentUser() currentUser: User, @Arg("userId") userId: string): Promise<boolean> {
    if (currentUser.id === userId) throw new AppError("You can't unmute yourself")
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { mutedAccounts: { disconnect: { id: userId } } },
    })
    return true
  }

  // BLOCK USER
  @Mutation(() => Boolean)
  async blockUser(@CurrentUser() currentUser: User, @Arg("userId") userId: string): Promise<boolean> {
    if (currentUser.id === userId) throw new AppError("You can't block yourself")
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { blockedAccounts: { connect: { id: userId } } },
    })
    // Also unfollow user
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { following: { disconnect: { id: userId } } },
    })
    return true
  }

  // UNBLOCK USER
  @Mutation(() => Boolean)
  async unblockUser(@CurrentUser() currentUser: User, @Arg("userId") userId: string): Promise<boolean> {
    if (currentUser.id === userId) throw new AppError("You can't unblock yourself")
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { blockedAccounts: { disconnect: { id: userId } } },
    })
    return true
  }
}
