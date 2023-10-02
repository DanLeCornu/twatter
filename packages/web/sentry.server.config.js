import * as Sentry from "@sentry/nextjs"

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
const NODE_ENV = process.env.NODE_ENV || "development"

Sentry.init({
  dsn:
    SENTRY_DSN ||
    "https://834d1ce46681462ebbf9f24bfdf2388e@o4505602731540480.ingest.sentry.io/4505602734882816",
  tracesSampleRate: 2.0,
  enabled: NODE_ENV === "production",
})
