import 'jsdom-global/register'
import React from 'react'
import { mount } from 'enzyme'
import Promise from 'bluebird'
import sinon from 'sinon'
import toJson from 'enzyme-to-json'
import analytics from '../util/analytics.js'
import attachment from '../util/attachment.js'
// import auth from '../util/auth.js'
// import cover from '../util/cover.js'

import Preview from './Preview.js'

jest.mock('../util/trello.js')
jest.mock('../util/config.js')
jest.mock('../util/auth.js')
jest.mock('../util/cover.js')
jest.mock('../util/attachment.js')
jest.mock('../util/analytics.js')

const setup = cover => {
  const ctx = {}
  ctx.props = {
    cover: cover ? { id: 2, name: 'https://invis.io/28D3U4ZCP' } : undefined,
    attachment: {
      id: 1,
      url: 'https://invis.io/28D3U4ZCP'
    },
    meta: attachment.__meta,
    card: {
      id: 3
    },
    updateCover: jest.fn()
  }

  ctx.wrapper = mount(<Preview {...ctx.props} />, {
    disableLifecycleMethods: false
  })

  ctx.component = ctx.wrapper.instance()
  expect(ctx.component).toBeDefined()
  expect(toJson(ctx.wrapper)).toMatchSnapshot()
  return ctx
}

describe('Preview', () => {
  beforeAll(() => {
    sinon.spy(Preview.prototype, 'setState')
  })

  beforeEach(() => {
    Preview.prototype.setState.reset()
  })

  describe('Preview with cover', () => {
    it('should be able to track navigation clicks', () => {
      const ctx = setup(true)
      return Promise.attempt(() => {
        ctx.wrapper.find('a.comment').simulate('click')
        ctx.wrapper.find('a.preview').simulate('click')
        ctx.wrapper.find('a.inspect').simulate('click')
      }).then(() => {
        expect(analytics.track).toHaveBeenCalledWith('Trello.Link.Clicked', {
          ...analytics.links.inspect
        })
        expect(analytics.track).toHaveBeenCalledWith('Trello.Link.Clicked', {
          ...analytics.links.preview
        })
        expect(analytics.track).toHaveBeenCalledWith('Trello.Link.Clicked', {
          ...analytics.links.comment
        })
      })
    })
    it('should be able to remove cover', () => {
      const ctx = setup(true)
      return Promise.attempt(() => {
        ctx.wrapper.find('a.remove-cover').simulate('click')
      }).then(() => {
        expect(analytics.track).lastCalledWith('Trello.CardCover.Changed', {
          ...analytics.cover.removed
        })
      })
    })
    it('should be able disconnect prototype and cover', () => {
      const ctx = setup(true)
      return Promise.attempt(() => {
        ctx.wrapper.find('a.disconnect').simulate('click')
      })
    })
  })
  describe('Preview without cover', () => {
    it('should be able to set cover', () => {
      const ctx = setup(false)
      return Promise.attempt(() => {
        ctx.wrapper.find('a.make-cover').simulate('click')
      }).then(() => {
        expect(analytics.track).lastCalledWith('Trello.CardCover.Changed', {
          ...analytics.cover.added
        })
      })
    })
    it('should be able disconnect prototype and cover', () => {
      const ctx = setup(false)
      return Promise.attempt(() => {
        ctx.wrapper.find('a.disconnect').simulate('click')
      })
    })
  })
})
