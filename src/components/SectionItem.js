import React from 'react'
import attachment from '../util/attachment.js'
import auth from '../util/auth.js'
import T from '../util/trello.js'
import analytics from '../util/analytics.js'
import Preview from './Preview.js'
import PreviewError from './PreviewError.js'

export default class SectionItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.t = T.iframe()
    this.disconnect = this.disconnect.bind(this)
    this.deleteCoverAttachment = this.deleteCoverAttachment.bind(this)
    this.deleteLinkAttachment = this.deleteLinkAttachment.bind(this)
  }

  componentDidMount () {
    attachment
      .meta(this.props.attachment.url)
      .then(meta => {
        this.setState(
          {
            meta: meta,
            documentType:
              analytics.documentType[meta.shareType] ||
              analytics.documentType.Default
          },
          () => {
            analytics.track(
              analytics.names.attachmentViewed,
              this.state.documentType
            )
          }
        )
      })
      .catch(err => {
        this.setState(
          {
            err: err,
            documentType: analytics.documentType.InvalidLink
          },
          () => {
            analytics.track(
              analytics.names.attachmentViewed,
              this.state.documentType
            )
          }
        )
      })
  }
  componentDidUpdate () {
    this.t.sizeTo('#root')
  }
  deleteLinkAttachment (token) {
    return attachment.remove(
      token,
      this.props.card.id,
      this.props.attachment.id
    )
  }

  deleteCoverAttachment (token) {
    if (!this.props.cover) {
      return T.Promise.resolve({})
    }
    return attachment.remove(token, this.props.card.id, this.props.cover.id)
  }

  disconnect (event) {
    event.preventDefault()
    analytics.track(analytics.names.attachmentChanged, {
      ...this.state.documentType,
      ...analytics.attachment.remove
    })

    auth
      .token()
      .then(token => {
        this.deleteCoverAttachment(token).then(() =>
          this.deleteLinkAttachment(token)
        )
      })
      .then(this.props.updateCover)
  }

  render () {
    if (this.state.meta) {
      return (
        <Preview
          meta={this.state.meta}
          documentType={this.state.documentType}
          disconnect={this.disconnect}
          {...this.props}
        />
      )
    }
    if (this.state.err) {
      return (
        <PreviewError
          err={this.state.err}
          documentType={this.state.documentType}
          {...this.props}
          disconnect={this.disconnect}
        />
      )
    }
    return <div />
  }
}
