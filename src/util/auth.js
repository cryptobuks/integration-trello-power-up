import config from './config.js'
import T from './trello.js'

const callbackUrl = `${config.baseUrl}/callback`
const authUrl = `https://trello.com/1/authorize?expiration=never&name=InVision&scope=read,write&key=${config.clientKey}&callback_method=fragment&return_url=${encodeURIComponent(
  callbackUrl
)}`

let isAuthenticated

export function validateToken (token) {
  return /^[0-9a-f]{64}$/.test(token)
}

export function stored () {
  return T.iframe().get('member', 'private', 'token')
}

export function request () {
  const t = T.iframe()
  return t
    .authorize(authUrl, {
      height: 680,
      width: 580,
      validToken: validateToken
    })
    .then(token => {
      isAuthenticated = Boolean(token)
      return t.set('member', 'private', 'token', token).then(() => token)
    })
}

export function token () {
  return isAuthenticated ? stored() : request()
}

export function init () {
  return stored().then(token => {
    isAuthenticated = Boolean(token)
    return isAuthenticated
  })
}
const auth = { token, stored, init }
export default auth
