import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'
import Promise from 'bluebird'
import toJson from 'enzyme-to-json'

import Attach from './Attach'

jest.mock('../util/trello.js')
jest.mock('../util/config.js')
jest.mock('../util/auth.js')
jest.mock('../util/cover.js')
jest.mock('../util/attachment.js')

const setup = () => {
  const ctx = {}
  ctx.wrapper = mount(<Attach />, {
    disableLifecycleMethods: false
  })

  ctx.component = ctx.wrapper.instance()
  expect(ctx.component).toBeDefined()
  expect(toJson(ctx.wrapper)).toMatchSnapshot()
  return ctx
}

describe('Attach', () => {
  it('should render ', () => {
    const ctx = setup()
    return Promise.attempt(() => {
      const input = ctx.wrapper.find('input')
      input.instance().value = 'https://invis.io/ASKGHA243'
      input.simulate('change', input)
      ctx.wrapper.find('form').simulate('submit')
    })
  })
})
