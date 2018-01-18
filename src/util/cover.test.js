import cover from './cover.js'
import attachment from './attachment.js'
import Promise from 'bluebird'
import T from './trello.js'

jest.mock('../util/trello.js')
jest.mock('../util/config.js')
jest.mock('../util/attachment.js')

describe('attachment', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockReturnValue(
      Promise.resolve({
        ok: true,
        json: jest.fn()
      })
    )
  })
  it('should attach cover', () => {
    return cover
      .attach({
        shareUrl: 'https://invis.io/NQ8979O8R',
        previewImgUrl: 'some_url'
      })
      .then(() => {
        expect(T.iframe().attach).toHaveBeenCalledWith({
          name: 'https://invis.io/NQ8979O8R',
          url: 'some_url'
        })
      })
  })
  it('should make cover', () => {
    return cover
      .make({
        shareUrl: 'https://invis.io/JHLK234K2'
      })
      .then(() => {
        expect(fetch).toBeCalledWith(
          'https://api.trello.com/1/cards/1/?key=key&token=some_token&idAttachmentCover=33',
          { method: 'PUT' }
        )
      })
  })
  it('should remove cover', () => {
    return cover.remove({ shareUrl: 'https://invis.io/JHLK234K2' }).then(() => {
      expect(attachment.remove).toHaveBeenCalledWith('some_token', 1, 33)
    })
  })
})
