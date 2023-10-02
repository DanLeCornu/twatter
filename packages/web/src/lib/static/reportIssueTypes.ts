import { ReportType } from "lib/graphql"

export const REPORT_ISSUE_TYPES = [
  {
    value: ReportType.Hate,
    title: "Hate",
    text: "Slurs, Racist or sexist stereotypes, Dehumanization, Incitement of fear or discrimination, Hateful references, Hateful symbols & logos",
  },
  {
    value: ReportType.Abuse,
    title: "Abuse & Harassment",
    text: "Insults, Unwanted Sexual Content & Graphic Objectification, Unwanted NSFW & Graphic Content, Violent Event Denial, Targeted Harassment and Inciting Harassment",
  },
  {
    value: ReportType.Violent,
    title: "Violent Speech",
    text: "Violent Threats, Wish of Harm, Glorification of Violence, Incitement of Violence, Coded Incitement of Violence",
  },
  {
    value: ReportType.ChildSafety,
    title: "Child Safety",
    text: "Child sexual exploitation, grooming, physical child abuse, underage user",
  },
  {
    value: ReportType.Privacy,
    title: "Privacy",
    text: "Sharing private information, threatening to share/expose private information, sharing non-consensual intimate images, sharing images of me that I don't want on the platform",
  },
  {
    value: ReportType.Spam,
    title: "Spam",
    text: "Financial scams, posting malicious links, misusing hashtags, fake engagement, repetitive replies, Retweets, or Direct Messages",
  },
  {
    value: ReportType.SelfHarm,
    title: "Suicide or self-harm",
    text: "Encouraging, promoting, providing instructions or sharing strategies for self-harm.",
  },
  {
    value: ReportType.Disturbing,
    title: "Sensitive or disturbing media",
    text: "Graphic Content, Gratutitous Gore, Adult Nudity & Sexual Behavior, Violent Sexual Conduct, Bestiality & Necrophilia, Media depicting a deceased individual",
  },
  {
    value: ReportType.Deceptive,
    title: "Deceptive identities",
    text: "Impersonation, non-compliant parody/fan accounts",
  },
  {
    value: ReportType.Extremism,
    title: "Violent & hateful entities",
    text: "Violent extremism and terrorism, hate groups & networks",
  },
]
