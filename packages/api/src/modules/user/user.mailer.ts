import * as Sentry from "@sentry/node"
import { ResetPasswordEmail } from "@twatter/emails"

import { FULL_WEB_URL, IS_DEV } from "../../lib/config"
import { mailer } from "../../lib/mailer"
import { User } from "./user.model"

export async function sendResetPasswordLink(user: User, token: string) {
  try {
    if (!user.email) return
    const link = `${FULL_WEB_URL}/reset-password/${token}`
    if (IS_DEV) console.log(link)
    await mailer.send({
      to: user.email,
      subject: "Reset your password",
      react: ResetPasswordEmail({ link }),
    })
  } catch (error) {
    console.log(error)
    Sentry.captureException(error)
  }
}

// export async function sendPasswordChanged(user: User) {
//   try {
//     if (!user.email) return
//     await mailer.send({
//       to: user.email,
//     })
//   } catch (error) {
//     Sentry.captureException(error)
//   }
// }
