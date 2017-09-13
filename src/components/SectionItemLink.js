import React from 'react'

export default class SectionItemLink extends React.Component {
  render () {
    return (
      <span>
        <a
          className={this.props.className}
          href={this.props.url || ''}
          target={this.props.url}
          onClick={this.props.handler}
        >
          {this.props.text}
        </a>
      </span>
    )
  }
}
