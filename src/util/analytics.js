// When the app is initializing, window.analytics doesn't exist yet, so we can't check whether it
// exists now. Instead, we check it on-demand.
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
  documentType: {
    UDF: { documentType: 'udf' },
    V6: { documentType: 'prototype' },
    V7: { documentType: 'prototype' },
    Default: { documentType: 'unknown' },
    InvalidLink: { documentType: 'invalidLink' }
  },
  attachment: {
    remove: { attachmentAction: 'remove' },
    attach: { attachmentAction: 'attach' }
  },
  cover: {
    added: {
      coverAction: 'added'
    },
    removed: {
      coverAction: 'removed'
    }
  },
  links: {
    thumbnail: { linkClicked: 'thumbnail' },
    inspect: { linkClicked: 'inspect' },
    preview: { linkClicked: 'preview' },
    comment: { linkClicked: 'comment' }
  },
  names: {
    linkClicked: 'Trello.Link.Clicked',
    cardCover: 'Trello.CardCover.Changed',
    attachmentChanged: 'Trello.Attachment.Changed',
    attachmentViewed: 'Trello.Attachment.Viewed'
  }
}

export default Analytics
