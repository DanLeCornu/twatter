import type * as yup from "yup"

declare module "yup" {
  interface StringSchema {
    nullIfEmpty(): yup.StringSchema
  }
  interface NumberSchema {
    nullIfEmpty(): yup.NumberSchema
  }
  interface DateSchema {
    nullIfEmpty(): yup.DateSchema
  }
  interface NullableArraySchema {
    nullIfEmpty(): yup.NullableArraySchema
  }
  interface NotRequiredArraySchema {
    nullIfEmpty(): yup.NotRequiredArraySchema
  }
  interface ArraySchema {
    nullIfEmpty(): yup.ArraySchema
  }
  interface MixedSchema {
    nullIfEmpty(): yup.MixedSchema
  }
}
