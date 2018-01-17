import React from 'react'
import cover from '../util/cover.js'
import config from '../util/config.js'
import T from '../util/trello.js'
import attachment from '../util/attachment.js'
import analytics from '../util/analytics.js'
import { isInVisionUrl } from '../util/url.js'
import './Attach.css'

export default class Attach extends React.Component {
  constructor (props) {
    super(props)
    this.t = T.iframe()
    this.state = {
      invalid: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.attach = this.attach.bind(this)
    this.refresh = this.refresh.bind(this)
    this.errorMessage = this.errorMessage.bind(this)
    this.validate = this.validate.bind(this)
  }

  componentDidMount () {
    this.linkInput.focus()
  }

  componentDidUpdate () {
    this.t.sizeTo('#root')
  }
  handleChange (event) {
    this.setState({ invalid: false })
  }
  validate (event) {
    if (this.linkInput.value && !isInVisionUrl(this.linkInput.value)) {
      this.setState({ invalid: true })
      return false
    }
  }

  refresh () {
    return this.t
      .set('card', 'shared', '_', '_')
      .then(() => this.t.remove('card', 'shared', '_'))
  }

  attach (meta) {
    return this.t
      .attach({
        url: meta.shareUrl,
        name: meta.screenName
      })
      .then(() => {
        let prop =
          meta.shareType === 'UDF'
            ? analytics.props.attachUDF
            : analytics.props.attachPrototype
        analytics.track(analytics.names.attachmentChanged, prop)
        return this.t.card('cover').then(c => {
          if (!c.cover) {
            return cover.attach(meta)
          }
        })
      })
      .then(
        () => this.t.closePopup(),
        err => {
          this.setState({ err: err })
          this.t.closePopup()
        }
      )
  }

  handleSubmit (event) {
    event.preventDefault()
    if (!this.linkInput.value || !isInVisionUrl(this.linkInput.value)) {
      this.setState({ invalid: true })
      return
    }
    this.formFieldset.setAttribute('disabled', 'disabled')
    attachment.meta(this.linkInput.value).then(this.attach, err => {
      analytics.track(
        analytics.names.attachmentChanged,
        analytics.props.invalidLink
      )
      this.formFieldset.removeAttribute('disabled')
      this.setState({ err: err, invalid: true })
    })
  }

  errorMessage () {
    if (this.state.invalid) {
      return (
        <span className='Attach__Error'>
          This InVision prototype share link is not valid or password protected.{' '}
          <br />
          Please{' '}
          <a
            href='https://support.invisionapp.com/hc/en-us/articles/115000649083-Sharing'
            target='_blank'
            rel='noopener noreferrer'
          >
            check here
          </a>{' '}
          for more information or reach out to{' '}
          <a
            href='mailto:support@invisionapp.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            support@invisionapp.com
          </a>
        </span>
      )
    }
    return ''
  }

  render () {
    return (
      <fieldset
        ref={fieldset => {
          this.formFieldset = fieldset
        }}
        className={
          'Attach ' + (this.state.invalid ? 'Attach--invalid' : 'Attach--valid')
        }
      >
        <form id='attach' onSubmit={this.handleSubmit}>
          <label htmlFor='sharelink'>Attach a link</label>
          <input
            ref={input => {
              this.linkInput = input
            }}
            id='sharelink'
            onChange={this.handleChange}
            onBlur={this.validate}
            className='Attach__Input'
            type='text'
            placeholder='Paste prototype share link here…'
          />
          {this.errorMessage()}
          <button type='submit' className='Attach__Submit'>
            Attach
          </button>
        </form>
        <hr />
        <div className='quiet u-bottom'>
          Tip: Add a prototype's <strong>share URL</strong> to communicate your
          vision.
          <ul>
            <li>
              <a
                href='https://support.invisionapp.com/hc/en-us'
                target='_blank'
                rel='noopener noreferrer'
              >
                Learn more
              </a>
            </li>
            <li>
              <a
                href={config.projectsUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                Create a new prototype
              </a>
            </li>
          </ul>
        </div>
      </fieldset>
    )
  }
}
