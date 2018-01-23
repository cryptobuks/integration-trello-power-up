import config from './config.js'
import T from './trello.js'

export function meta (url) {
  return new T.Promise((resolve, reject) => {
    fetch(`${config.metaUrl}/share?shareurl=${encodeURIComponent(url)}`)
      .then(res => {
        if (res.ok) {
          resolve(res.json())
        } else {
          reject(
            new Error(
              `unable to fetch metadata for shared link ${res.statusText}`
            )
          )
        }
      })
      .catch(reject)
  })
}

export function remove (token, card, attachment) {
  return new T.Promise((resolve, reject) => {
    fetch(
      `https://api.trello.com/1/cards/${card}/attachments/${attachment}/?key=${
        config.clientKey
      }&token=${token}`,
      {
        method: 'DELETE'
      }
    )
      .then(res => {
        if (res.ok) {
          resolve(res.json())
        } else {
          reject(new Error(`unable to remove attachment: ${res.statusText}`))
        }
      })
      .catch(reject)
  })
}

const attachment = { meta, remove }
export default attachment
