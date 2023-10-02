import * as yup from "yup"

yup.addMethod(yup.string, "nullIfEmpty", function () {
  return this.transform((val, origVal) => (origVal.trim() === "" ? null : val)).nullable()
})

yup.addMethod(yup.number, "nullIfEmpty", function () {
  return this.transform((val, origVal) => (origVal === "" ? null : val)).nullable()
})

yup.addMethod(yup.date, "nullIfEmpty", function () {
  return this.transform((val, origVal) => (origVal === "" ? null : val)).nullable()
})

// Yup.addMethod(Yup.array, "nullIfEmpty", function () {
//   return this.transform((val, origVal) =>
//     origVal && origVal.length && origVal.length === 0 ? null : val,
//   ).nullable()
// })
yup.addMethod(yup.array, "nullIfEmpty", function () {
  return this.transform((val, origVal) =>
    origVal && origVal.length && origVal.length === 0 ? null : val,
  ).nullable()
})
yup.addMethod(yup.mixed, "nullIfEmpty", function () {
  return this.transform((val, origVal) => origVal || val).nullable()
})

export default yup
