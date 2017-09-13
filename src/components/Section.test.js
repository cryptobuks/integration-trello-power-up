import React from 'react'
import { mount } from 'enzyme'
import Promise from 'bluebird'
import sinon from 'sinon'
import toJson from 'enzyme-to-json'

import T from '../util/trello.js'
// import attachment from '../util/attachment.js'

import Section from './Section'
// import SectionItem from './SectionItem.js'

jest.mock('../util/trello.js')
jest.mock('../util/config.js')
jest.mock('../util/auth.js')
jest.mock('../util/cover.js')
jest.mock('../util/attachment.js')

const setup = card => {
  const ctx = {}
  T.iframe().card.mockReturnValue(Promise.resolve(card))
  ctx.wrapper = mount(<Section />, {
    disableLifecycleMethods: false
  })

  ctx.component = ctx.wrapper.instance()
  expect(ctx.component).toBeDefined()
  expect(Section.prototype.componentDidMount.callCount).toBe(1)
  expect(ctx.component.t.render).toBeCalledWith(ctx.component.fetch)
  expect(toJson(ctx.wrapper)).toMatchSnapshot()
  return ctx
}

describe('Section', () => {
  beforeAll(() => {
    sinon.spy(Section.prototype, 'componentDidMount')
    sinon.spy(Section.prototype, 'setState')
  })

  beforeEach(() => {
    Section.prototype.componentDidMount.reset()
    Section.prototype.setState.reset()
  })

  it('should render items', () => {
    const ctx = setup({
      attachments: [
        { id: 1, url: 'https://invis.io/NQ8979O8R' },
        { id: 2, url: 'https://google.com' },
        { id: 3, url: 'https://invis.io/JHLK234K2' },
        { id: 4, url: 'https://invision.com' },
        { id: 5, url: 'https://invis.io/LKASHFL23' }
      ],
      cover: {
        name: 'https://invis.io/JHLK234K2'
      }
    })
    return Promise.attempt(ctx.component.fetch).then(() => {
      expect(ctx.component.state.attachments).toEqual(
        expect.arrayContaining([
          { id: 1, url: 'https://invis.io/NQ8979O8R' },
          { id: 3, url: 'https://invis.io/JHLK234K2' },
          { id: 5, url: 'https://invis.io/LKASHFL23' }
        ])
      )
      expect(ctx.component.setState.callCount).toBe(1)
      expect(T.iframe().sizeTo).toBeCalledWith('#root')
      // expect(ctx.wrapper.find(SectionItem)).to.have.length(3)
    })
  })

  it('does not render items', () => {
    const ctx = setup({ attachments: [] })

    return Promise.attempt(ctx.component.fetch).then(() => {
      ctx.component.fetch()
      expect(ctx.component.setState.callCount).toBe(1)
      expect(ctx.component.state.attachments).toEqual(
        expect.arrayContaining([])
      )
      expect(ctx.component.setState.callCount).toBe(1)
      expect(T.iframe().sizeTo).toBeCalledWith('#root')
      // expect(ctx.wrapper.find(SectionItem)).to.have.length(0)
    })
  })

  it('should get cover for attachment', () => {
    const component = new Section({})
    component.state = {
      cover: {
        name: 'https://invis.io/JHLK234K2'
      }
    }
    expect(
      component.cover({ url: 'https://invis.io/NQ8979O8R' })
    ).toBeUndefined()

    expect(component.cover({ url: 'https://invis.io/JHLK234K2' })).toBe(
      component.state.cover
    )
  })
})
