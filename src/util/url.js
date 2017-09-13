export const isInVisionUrl = url =>
  /^https:\/\/(([a-z0-9-]+(\.[a-z0-9-]+)*?\.)?(invisionapp\.com|invision\.works)\/share|invis.io)\/[A-Z0-9]/g.test(
    url
  )
export default { isInVisionUrl }
