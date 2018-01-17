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
  props: {
    thumbnail: { linkClicked: 'thumbnail' },
    inspect: { linkClicked: 'inspect' },
    preview: { linkClicked: 'preview' },
    comment: { linkClicked: 'comment' },
    removeUDF: { attachmentAction: 'remove', documentType: 'udf' },
    removePrototype: {
      attachmentAction: 'remove',
      documentType: 'prototype'
    },
    attachUDF: { attachmentAction: 'attach', documentType: 'udf' },
    attachPrototype: {
      attachmentAction: 'attach',
      documentType: 'prototype'
    },
    invalidLink: {
      attachmentAction: 'invalidLink'
    },
    coverAdded: {
      coverAction: 'added'
    },
    coverRemoved: {
      coverAction: 'removed'
    },
    viewEmpty: { documentType: 'none' },
    viewPrototype: { documentType: 'prototype' },
    viewUDF: { documentType: 'udf' }
  },
  names: {
    linkClicked: 'Trello.Link.Clicked',
    cardCover: 'Trello.CardCover.Changed',
    attachmentChanged: 'Trello.Attachment.Changed',
    attachmentViewed: 'Trello.Attachment.Viewed'
  }
}

export default Analytics
