import config from './config.js'
import * as auth from './auth.js'
import T from './trello.js'
import attachment from './attachment.js'

export function attach (meta) {
  const t = T.iframe()
  return t
    .attach({ url: meta.previewImgUrl, name: meta.shareUrl })
    .then(() => findCover(meta))
}

function findCover (meta) {
  const t = T.iframe()
  return t
    .card('attachments')
    .get('attachments')
    .filter(a => a.name === meta.shareUrl)
    .then(a => a[0])
}

export function make (meta) {
  const t = T.iframe()
  return auth
    .token()
    .then(token => {
      return findCover(meta).then(a => a || attach(meta)).then(a => [token, a])
    })
    .spread((token, attachment) => {
      let context = t.getContext()
      return fetch(
        `https://api.trello.com/1/cards/${context.card}/?key=${config.clientKey}&token=${token}&idAttachmentCover=${attachment.id}`,
        { method: 'PUT' }
      )
    })
}

export function remove (meta) {
  const t = T.iframe()
  const context = t.getContext()
  const attachments = t
    .card('attachments')
    .get('attachments')
    .filter(a => a.name === meta.shareUrl)

  return auth.token().then(token => {
    return T.Promise.all(
      attachments.map(a => attachment.remove(token, context.card, a.id))
    )
  })
}

const cover = { attach, make, remove }
export default cover
