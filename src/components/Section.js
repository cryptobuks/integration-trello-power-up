import React from 'react'
import SectionItem from './SectionItem.js'
import update from 'react-addons-update'
import { isInVisionUrl } from '../util/url.js'
import T from '../util/trello.js'
import auth from '../util/auth.js'

export default class Section extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      attachments: []
    }
    this.fetch = this.fetch.bind(this)
    this.t = T.iframe()
    auth.init()
  }

  componentDidMount () {
    this.t.render(this.fetch)
  }

  componentDidUpdate () {
    return this.t.sizeTo('#root')
  }

  fetch () {
    return this.t.card('all').then(c => {
      let cover = c.cover
      let a = c.attachments.filter(a => isInVisionUrl(a.url))
      let newState = update(this.state, {
        $set: {
          attachments: a,
          cover: cover,
          card: c
        }
      })
      this.setState(newState)
    })
  }

  cover (attachment) {
    if (this.state.cover && attachment.url === this.state.cover.name) {
      return this.state.cover
    }
  }

  render () {
    return (
      <div className='u-clearfix'>
        {this.state.attachments.map(attachment =>
          <SectionItem
            {...this.props}
            attachment={attachment}
            card={this.state.card}
            cover={this.cover(attachment)}
            key={attachment.id}
            updateCover={this.fetch}
          />
        )}
      </div>
    )
  }
}
