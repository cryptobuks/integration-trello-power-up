const analytics = {
  track: jest.fn(),
  props: {
    comment: 'comment',
    preview: 'preview',
    inspect: 'inspect',
    coverAdded: 'added',
    coverRemoved: 'removed'
  },
  names: {
    linkClicked: 'Trello.Link.Clicked',
    cardCover: 'Trello.CardCover.Changed',
    attachmentChanged: 'Trello.Attachment.Changed',
    attachmentViewed: 'Trello.Attachment.Viewed'
  },
  isUDFShareUrl: jest.fn()
}
export default analytics
