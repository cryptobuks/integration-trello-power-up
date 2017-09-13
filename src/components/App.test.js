import React from 'react'
import App from './App'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import T from '../util/trello.js'

jest.mock('../util/trello.js')
jest.mock('../util/config.js')
jest.mock('../util/auth.js')
jest.mock('../util/cover.js')

function setup () {
  const ctx = {}
  ctx.wrapper = shallow(<App />)
  ctx.component = ctx.wrapper.instance()
  expect(ctx.component).toBeDefined()
  expect(toJson(ctx.wrapper)).toMatchSnapshot()
  return ctx
}

describe('App', () => {
  it('renders renders and initializes TrelloPowerUp', () => {
    const ctx = setup()
    expect(T.initialize).toHaveBeenCalledWith({
      'attachment-sections': ctx.component.cardSectionInit,
      'card-buttons': ctx.component.cardButtonInit
    })
  })

  it('process button callback', () => {
    const ctx = setup()
    const t = {
      popup: jest.fn()
    }

    ctx.component.cardButtonCallback(t)
    expect(t.popup).toHaveBeenCalled()
  })

  it('should initialize card button', () => {
    const ctx = setup()
    var res = ctx.component.cardButtonInit()
    expect(res.length).toBe(1)
    expect(res).toContainEqual({
      icon: ctx.component.grayIcon,
      text: 'InVision',
      callback: ctx.component.cardButtonCallback
    })
  })

  it('should initialize card section with attachments', () => {
    const ctx = setup()
    var res = ctx.component.cardSectionInit(
      {
        signUrl: a => a
      },
      {
        entries: [
          { url: 'https://invis.io/BZCY6PFS3' },
          { url: 'https://google.com' }
        ]
      }
    )
    expect(res.length).toBe(1)
    expect(res).toContainEqual({
      id: 'InVision',
      claimed: [{ url: 'https://invis.io/BZCY6PFS3' }],
      icon: ctx.component.grayIcon,
      title: 'InVision',
      content: {
        type: 'iframe',
        url: './section',
        height: 50
      }
    })
  })

  it('should not innitialize card section with attachments', () => {
    const ctx = setup()
    var res = ctx.component.cardSectionInit(undefined, {
      entries: [{ url: 'https://google.com' }]
    })
    expect(res.length).toBe(0)
  })
})
