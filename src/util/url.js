export const isInVisionUrl = url =>
  (/^https:\/\/(([a-z0-9-]+(\.[a-z0-9-]+)*?\.)?(invisionapp\.com|invision\.works)\/share|invis.io)\/[A-Z0-9]/g.test(
    url
  ) ||
  /^https:\/\/(([a-z0-9-]+(\.[a-z0-9-]+)*?\.)?(invisionapp\.com|invision\.works)\/prototype)\/[A-Za-z-0-9]*(\/(preview|play|comment|inspect))?/g.test(
    url))

export default { isInVisionUrl }
