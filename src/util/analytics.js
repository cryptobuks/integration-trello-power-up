import config from './config'
// When the app is initializing, window.analytics doesn't exist yet, so we can't check whether it
// exists now. Instead, we check it on-demand.
const serverType = config.serverType
const Analytics = {
  track: (name, props) => {
    if (
      window.measure &&
      window.measure.collect &&
      typeof window.measure.collect === 'function'
    ) {
      window.measure.collect(name, props)
    }
  },
  isUDFShareUrl (shareUrl) {
    return shareUrl.match(/^https:\/\/(([a-z0-9-]+(\.[a-z0-9-]+)*?\.)?(invisionapp\.com|invision\.works)\/prototype)\/[A-Za-z-0-9]*(\/(preview|play|comment|inspect))?/i)
  },
  props: {
    thumbnail: { linkClicked: 'thumbnail', serverType },
    inspect: { linkClicked: 'inspect', serverType },
    preview: { linkClicked: 'preview', serverType },
    comment: { linkClicked: 'comment', serverType },
    removeUDF: { attachmentAction: 'remove', documentType: 'udf', serverType },
    removePrototype: {
      attachmentAction: 'remove',
      documentType: 'prototype',
      serverType
    },
    attachUDF: { attachmentAction: 'attach', documentType: 'udf', serverType },
    attachPrototype: {
      attachmentAction: 'attach',
      documentType: 'prototype',
      serverType
    },
    invalidLink: {
      attachmentAction: 'invalidLink',
      serverType
    },
    coverAdded: {
      coverAction: 'added'
    },
    coverRemoved: {
      coverAction: 'removed'
    },
    viewEmpty: { documentType: 'none', serverType },
    viewPrototype: { documentType: 'prototype', serverType },
    viewUDF: { documentType: 'udf', serverType }
  },
  names: {
    linkClicked: 'Trello.Link.Clicked',
    cardCover: 'Trello.CardCover.Changed',
    attachmentChanged: 'Trello.Attachment.Changed',
    attachmentViewed: 'Trello.Attachment.Viewed'
  }
}

export default Analytics
