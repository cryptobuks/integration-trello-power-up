import React from 'react'
import './Callback.css'

export default class Callback extends React.Component {
  componentDidMount () {
    let token = window.location.hash.substring(7)
    if (window.opener) {
      window.opener.authorize(token)
    } else {
      window.localStorage.setItem('token', token)
    }
    setTimeout(function () {
      window.close()
    }, 1000)
  }

  render () {
    return (
      <div className='Callback'>
        <h1>You're set!</h1>
        <p>
          This window should close automatically. If it doesn't, go ahead and
          close it.
        </p>
      </div>
    )
  }
}
