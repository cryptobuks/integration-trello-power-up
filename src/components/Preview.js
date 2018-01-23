import React from 'react'
import moment from 'moment'
import cover from '../util/cover.js'
import T from '../util/trello.js'
import analytics from '../util/analytics.js'
import SectionItemLink from './SectionItemLink.js'
import './Preview.css'

export default class Preview extends React.Component {
  constructor (props) {
    super(props)
    this.t = T.iframe()
    this.makeCover = this.makeCover.bind(this)
    this.removeCover = this.removeCover.bind(this)
    this.getActions = this.getActions.bind(this)
    this.getLinks = this.getLinks.bind(this)
  }

  makeCover (event) {
    event.preventDefault()
    analytics.track(analytics.names.cardCover, {
      ...analytics.cover.added,
      ...this.props.documentType
    })
    return cover.make(this.props.meta).then(this.props.updateCover)
  }

  removeCover (event) {
    event.preventDefault()
    analytics.track(analytics.names.cardCover, {
      ...analytics.cover.removed,
      ...this.props.documentType
    })
    return cover.remove(this.props.meta).then(this.props.updateCover)
  }

  getActions () {
    let actions = [
      {
        handler: this.props.disconnect,
        text: 'Disconnect prototype',
        className: 'disconnect'
      }
    ]
    if (!this.props.cover) {
      actions.unshift({
        handler: this.makeCover,
        text: 'Make cover',
        className: 'make-cover'
      })
    } else {
      actions.unshift({
        handler: this.removeCover,
        text: 'Remove from cover',
        className: 'remove-cover'
      })
    }
    return actions
  }
  getLinks () {
    return [
      {
        url: this.props.meta.commentUrl,
        text: 'Comment',
        className: 'comment',
        prop: {
          ...this.props.documentType,
          ...analytics.links.comment
        }
      },
      {
        url: this.props.meta.previewUrl,
        text: 'Preview',
        className: 'preview',
        prop: {
          ...this.props.documentType,
          ...analytics.links.preview
        }
      },
      {
        url: this.props.meta.inspectUrl,
        text: 'Inspect',
        className: 'inspect',
        prop: {
          ...this.props.documentType,
          ...analytics.links.inspect
        }
      }
    ]
  }
  render () {
    const backgroundStyle = {
      backgroundImage: "url('" + this.props.meta.previewImgUrl + "')",
      backgroundPositionY: '0px',
      backgroundSize: 'cover'
    }

    return (
      <div className='SectionItem basic-attachment-list-item'>
        <a
          className='SectionItem__Preview'
          href={this.props.meta.shareUrl}
          target={this.props.meta.shareUrl}
          title={this.props.meta.screenName}
          style={backgroundStyle}
          onClick={() =>
            analytics.track(analytics.names.linkClicked, {
              ...this.props.documentType,
              ...analytics.links.thumbnail
            })
          }
        />
        <p className='SectionItemDetails attachment-thumbnail-details'>
          <span className='SectionItemDetails__Name'>
            {this.props.meta.screenName || this.props.meta.shareUrl}
          </span>
          <span className='u-block quiet SectionItemDetails__Actions'>
            {this.getLinks().map(link => {
              return (
                <SectionItemLink
                  {...link}
                  handler={() =>
                    analytics.track(analytics.names.linkClicked, link.prop)
                  }
                  key={this.props.attachment.id + link.className}
                />
              )
            })}
          </span>
          <span className='u-block quiet SectionItemDetails__Actions'>
            {this.getActions().map(action => {
              return (
                <SectionItemLink
                  {...action}
                  key={this.props.attachment.id + action.className}
                />
              )
            })}
          </span>
          <span
            className='attachment-thumbnail-details-title'
            href={this.props.meta.commentUrl}
            target={this.props.meta.commentUrl}
            title={this.props.meta.screenName}
          >
            <span className='u-block quiet'>
              Modified:
              <span
                className='date'
                title={moment(this.props.meta.lastUpdatedAt).fromNow()}
              >
                {' '}
                {moment(this.props.meta.lastUpdatedAt).fromNow()}
              </span>{' '}
              by {this.props.meta.userName}
            </span>
          </span>
        </p>
      </div>
    )
  }
}
