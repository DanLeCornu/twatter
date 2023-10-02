import sendgridClient from "@sendgrid/client"
import sendgrid from "@sendgrid/mail"
import * as Sentry from "@sentry/node"
import handlebars from "handlebars"
import nodemailer, { Transporter } from "nodemailer"

import { IS_PRODUCTION, SENDGRID_API_KEY } from "./config"

sendgrid.setApiKey(SENDGRID_API_KEY)
sendgridClient.setApiKey(SENDGRID_API_KEY)

// DEV EMAIL
const DEV_EMAIL_OPTIONS: any = {
  host: "localhost",
  port: 1025,
  secure: false,
  debug: true,
  ignoreTLS: true,
}

export const DLC_EMAIL = "danthewebdev@gmail.com"
export const SIMPLE_TEMPLATE_ID = "d-46a83e56d4c74b96bdb516d129f38286"

// interface TemplateVersion {
//   updated_at: string
//   html_content: string
//   plain_content: string
//   subject: string
// }

// interface SendGridResponse {
//   versions: TemplateVersion[]
// }

interface MailArgs {
  templateId: string
  to: string[] | string
  variables?: any
}

export class Mailer {
  private readonly from: string = "Twatter <danthewebdev@gmail.com>"
  private devMail: Transporter

  constructor() {
    this.devMail = nodemailer.createTransport(DEV_EMAIL_OPTIONS)
  }

  async send(args: MailArgs) {
    const data = {
      from: this.from,
      to: args.to,
      templateId: args.templateId,
      dynamic_template_data: args.variables,
    }
    try {
      if (IS_PRODUCTION) {
        await sendgrid.send(data)
      } else {
        await this.sendDev(args)
      }
    } catch (err) {
      Sentry.captureException(err)
      console.log("Error sending mail:", err)
    }
  }

  async sendDev(args: MailArgs) {
    // const [template] = await sendgridClient.request({
    //   method: "GET",
    //   url: `/v3/templates/${args.templateId}`,
    // })

    // const version = (template.body as SendGridResponse).versions
    //   .sort((a, b) => dayjs(a.updated_at).unix() - dayjs(b.updated_at).unix())
    //   .pop()
    // if (!version) return
    // const htmlSource = handlebars.compile(version.html_content)
    const htmlSource = handlebars.compile("<p>{{{text}}}</p><p>{{{link}}}</p>")
    const html = htmlSource(args.variables)

    // const textSource = handlebars.compile(version.plain_content)
    const textSource = handlebars.compile("<p>{{{text}}}</p><p>{{{link}}}</p>")
    const text = textSource(args.variables)

    // const subject = args.variables?.subject || version.subject
    const subject = args.variables?.subject || "subject"

    return this.devMail.sendMail({ to: args.to, from: this.from, subject, html, text })
  }
}
