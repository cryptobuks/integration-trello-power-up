import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import PreviewError from './PreviewError.js'

global.window = {}

jest.mock('../util/trello.js')
jest.mock('../util/config.js')
jest.mock('../util/auth.js')
jest.mock('../util/cover.js')
jest.mock('../util/attachment.js')
jest.useFakeTimers()

const setup = () => {
  const ctx = {
    props: {
      attachment: {
        url: 'https://google.com'
      }
    }
  }
  ctx.wrapper = mount(<PreviewError {...ctx.props} />, {
    disableLifecycleMethods: false
  })

  ctx.component = ctx.wrapper.instance()
  expect(ctx.component).toBeDefined()
  expect(toJson(ctx.wrapper)).toMatchSnapshot()
  return ctx
}

describe('PreviewError', () => {
  it('should render', () => {
    setup()
  })
})
