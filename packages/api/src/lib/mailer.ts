import { render } from "@react-email/render"
import nodemailer from "nodemailer"
import { Resend } from "resend"
import type { CreateEmailOptions } from "resend/build/src/emails/interfaces"

import { IS_PRODUCTION, RESEND_API_KEY } from "./config"

const resend = new Resend(RESEND_API_KEY)

type Props = Omit<CreateEmailOptions, "from"> & { react: React.ReactElement<unknown>; from?: string }
class Mailer {
  async send(args: Props) {
    try {
      const from = args.from || "info@twatter.app"
      if (IS_PRODUCTION) {
        await resend.sendEmail({ ...args, from, text: args.text || "" })
      } else {
        await this.sendDev({ ...args, from })
      }
    } catch (e) {
      console.log("Error sending mail:", e)
      console.log(e)
      // Sentry.captureException(e)
    }
  }

  private async sendDev(args: Props) {
    try {
      const devMail = nodemailer.createTransport({
        host: "localhost",
        port: 1025,
        secure: false,
        debug: true,
        ignoreTLS: true,
      })
      const html = render(args.react, { pretty: true })
      const text = render(args.react, { plainText: true })
      return devMail.sendMail({ ...args, html, text })
    } catch (e) {
      console.log("Error sending mail:", e)
      console.log(e)
    }
  }
}

export const mailer = new Mailer()
