import Promise from 'bluebird'
export const t = {
  render: jest.fn(),
  card: jest.fn(),
  sizeTo: jest.fn(),
  attach: jest.fn(),
  set: jest.fn(),
  get: jest.fn(),
  remove: jest.fn(),
  authorize: jest.fn(),
  getContext: jest.fn(),
  closePopup: jest.fn()
}
t.attach.mockReturnValue(Promise.resolve())
t.set.mockReturnValue(Promise.resolve())
t.remove.mockReturnValue(Promise.resolve())
t.get.mockReturnValue(Promise.resolve('some_token'))
t.authorize.mockReturnValue(Promise.resolve('some_token'))
t.getContext.mockReturnValue({ card: 1 })
t.card.mockReturnValue(
  Promise.resolve({
    id: 1,
    attachments: [
      { id: 1, url: 'https://invis.io/NQ8979O8R' },
      { id: 2, url: 'https://google.com' },
      { id: 3, url: 'https://invis.io/JHLK234K2' },
      { id: 33, url: 'some_url', name: 'https://invis.io/JHLK234K2' },
      { id: 4, url: 'https://invision.com' },
      { id: 5, url: 'https://invis.io/LKASHFL23' }
    ]
  })
)
const T = {
  initialize: jest.fn(),
  iframe: jest.fn(() => t),
  Promise: Promise
}
export default T
