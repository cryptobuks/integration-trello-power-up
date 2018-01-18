import React from 'react'
import GRAY_ICON from '../svg/invision-gray-16px.svg'
import { isInVisionUrl } from '../util/url.js'
import config from '../util/config.js'
import T from '../util/trello.js'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.grayIcon = `${config.baseUrl}${GRAY_ICON}`

    this.cardSectionInit = this.cardSectionInit.bind(this)
    this.cardButtonInit = this.cardButtonInit.bind(this)
    this.cardButtonCallback = this.cardButtonCallback.bind(this)

    T.initialize({
      'attachment-sections': this.cardSectionInit,
      'card-buttons': this.cardButtonInit
    })
  }

  cardButtonCallback (t) {
    return t.popup({
      title: 'Attach prototype',
      url: './attach',
      height: 205
    })
  }

  cardSectionInit (t, options) {
    const claimed = options.entries.filter(attachment =>
      isInVisionUrl(attachment.url)
    )
    if (!claimed || claimed.length === 0) {
      return []
    }
    return [
      {
        id: 'InVision',
        claimed: claimed,
        icon: this.grayIcon,
        title: 'InVision',
        content: {
          type: 'iframe',
          url: t.signUrl('./section', {}),
          height: 50
        }
      }
    ]
  }

  cardButtonInit (t, options) {
    return [
      {
        icon: this.grayIcon,
        text: 'InVision',
        callback: this.cardButtonCallback
      }
    ]
  }
  render () {
    return (
      <div>
        InVision Trello Power-Up<br />
        Build date: {config.buildDate}
        <br />
        Version: {config.version}
      </div>
    )
  }
}
