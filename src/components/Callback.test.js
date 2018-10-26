import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import Callback from './Callback'
import Promise from 'bluebird'

jest.mock('../util/window.js')
jest.mock('../util/trello.js')
jest.mock('../util/config.js')
jest.mock('../util/auth.js')
jest.mock('../util/cover.js')
jest.mock('../util/attachment.js')
jest.useFakeTimers()

const setup = () => {
  const ctx = {}
  ctx.wrapper = mount(<Callback />, {
    disableLifecycleMethods: false
  })

  ctx.component = ctx.wrapper.instance()
  expect(ctx.component).toBeDefined()
  expect(toJson(ctx.wrapper)).toMatchSnapshot()
  return ctx
}

describe('Callback', () => {
  it('should render and set token to local storage', () => {
    setTimeout.mockReset()
    setup()
    jest.runAllTimers()
    Promise.attempt(() => {
      expect(window.localStorage.setItem).toBeCalledWith('token', 'some_token')
      expect(setTimeout.mock.calls.length).toBe(1) // first one is from promise
      expect(setTimeout.mock.calls[0][1]).toBe(1000)
    })
  })
  it('should render and set token opener', () => {
    setTimeout.mockReset()
    setup()
    jest.runAllTimers()

    Promise.attempt(() => {
      expect(window.opener.authorize).toBeCalledWith('some_token')
      expect(setTimeout.mock.calls.length).toBe(1) // first one is from promise
      expect(setTimeout.mock.calls[0][1]).toBe(1000)
    })
  })
})
