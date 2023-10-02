// import * as Sentry from "@sentry/node"
import { Service } from "typedi"

import { Mailer } from "../../lib/mailer"

@Service()
export class PostMailer extends Mailer {
  // sendSuggestedPost(title: string, deviceId: string) {
  //   try {
  //     return this.send({
  //       templateId: SIMPLE_TEMPLATE_ID,
  //       to: DLC_EMAIL,
  //       variables: {
  //         subject: "Twatter - new post suggested",
  //         heading: "A new post has been suggested",
  //         text: `
  // 					deviceId: ${deviceId}
  // 					<br>
  // 					title: ${title}
  // 				`,
  //       },
  //     })
  //   } catch (error) {
  //     Sentry.captureException(error)
  //   }
  // }
}
