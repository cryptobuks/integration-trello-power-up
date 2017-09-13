import * as auth from './auth.js'
import T from './trello.js'

jest.mock('../util/trello.js')
jest.mock('../util/config.js')

describe('auth', () => {
  it('should fetch token from trello', () => {
    return auth.stored().then(token => {
      expect(T.iframe().get).toHaveBeenCalledWith('member', 'private', 'token')
      expect(token).toBe('some_token')
    })
  })
  it('should validate token', () => {
    expect(auth.validateToken('')).toBe(false)
    expect(auth.validateToken('1324rqw')).toBe(false)
    expect(
      auth.validateToken(
        '2af4ce76ad177db190fde6a884c059eb0044b9d13e57adac4e42b7420d464304'
      )
    ).toBe(true)
  })
  it('should request token and obtain it from store', () => {
    return auth
      .token()
      .then(token => {
        expect(token).toBe('some_token')
        expect(
          T.iframe().authorize
        ).toHaveBeenCalledWith(
          'https://trello.com/1/authorize?expiration=never&name=InVision&scope=read,write&key=key&callback_method=fragment&return_url=https%3A%2F%2Finvisionapp.com%2Fbase%2Fcallback',
          { height: 680, validToken: auth.validateToken, width: 580 }
        )
        expect(T.iframe().set).toHaveBeenCalledWith(
          'member',
          'private',
          'token',
          'some_token'
        )
      })
      .then(() => auth.token())
      .then(token => {
        expect(token).toBe('some_token')
        expect(T.iframe().get).toHaveBeenCalledWith(
          'member',
          'private',
          'token'
        )
      })
  })
  it('should be able to fetch token on init', () => {
    return auth.init().then(token => expect(token).toBe(true))
  })
})
