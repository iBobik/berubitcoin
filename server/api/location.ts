export default defineEventHandler(({ context }) => {
  return [
    parseFloat(context.cf?.longitude ?? '0'),
    parseFloat(context.cf?.latitude ?? '0')
  ]
})
