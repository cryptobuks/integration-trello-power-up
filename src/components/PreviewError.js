import React from 'react'

export default class PreviewError extends React.Component {
  render () {
    return (
      <p className='PreviewError basic-attachment-list-item'>
        <a
          href={this.props.attachment.url}
          target='_blank'
          rel='noopener noreferrer'
        >
          {this.props.attachment.url}
        </a>{' '}
        is not valid or password protected.{' '}
        <a
          target='_blank'
          rel='noopener noreferrer'
          href=''
          onClick={this.props.disconnect}
        >
          Disconnect prototype
        </a>{' '}
        or reach out to{' '}
        <a
          href='mailto:support@invisionapp.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          support@invisionapp.com
        </a>{' '}
        for more information
      </p>
    )
  }
}
