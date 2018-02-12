export const config = {
  ...window.InVisionConfig,
  baseUrl:
    window.location.origin ||
    window.location.protocol + '//' + window.location.host
}

config.getMetaUrl = url => {
  try {
    const invDomainReg = /.+\.invisionapp\.com|.+\.invision\.works|.+\.invisionbeta\.com/g
    const parsedUrl = new URL(decodeURIComponent(url)) //eslint-disable-line
    if (parsedUrl.origin === 'https://invis.io') {
      return 'https://projects.invisionapp.com/meta-bff'
    }
    if (invDomainReg.test(parsedUrl.origin)) {
      return `${parsedUrl.origin}/meta-bff`
    }
  } catch (e) {}
  return ''
}

export default config
