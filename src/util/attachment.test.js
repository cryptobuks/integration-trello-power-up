import attachment from './attachment.js'
import Promise from 'bluebird'

jest.mock('../util/trello.js')
jest.mock('../util/config.js')

const fetchRes = {
  json: jest.fn(),
  ok: true
}

describe('attachment', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockReturnValue(Promise.resolve(fetchRes))
  })
  it('should get meta', () => {
    return attachment.meta('https://invis.io/ADSF324').then(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://invisionapp.com/base/meta-bff/share?shareurl=https%3A%2F%2Finvis.io%2FADSF324'
      )
      expect(fetchRes.json).toHaveBeenCalled()
    })
  })
  it('should delete attachment', () => {
    return attachment.remove(1, 2, 3).then(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://api.trello.com/1/cards/2/attachments/3/?key=key&token=1',
        {
          method: 'DELETE'
        }
      )
    })
  })
})
