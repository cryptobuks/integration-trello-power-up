global.window = {
  InVisionConfig: {},
  location: {
    origin: ''
  }
}

describe('config', () => {
  it('should return valid meta-bff url for invis.io domain', () => {
    global.URL = function () {
      return { origin: 'https://invis.io' }
    }
    let config = require('./config').default
    expect(config.getMetaUrl('https://invis.io/share/TESTIT')).toBe(
      'https://projects.invisionapp.com/meta-bff'
    )
  })

  it('should return valid meta-bff url for team name based domains', () => {
    global.URL = function () {
      return { origin: 'https://black.invisionapp.com' }
    }
    let config = require('./config').default
    expect(
      config.getMetaUrl('https://black.invisionapp.com/share/TESTIT')
    ).toBe('https://black.invisionapp.com/meta-bff')
  })

  it('should return valid meta-bff url for team name based domains', () => {
    global.URL = function () {
      return { origin: 'https://black.invisionapp.com' }
    }
    let config = require('./config').default
    expect(
      config.getMetaUrl('https://black.invisionapp.com/share/TESTIT')
    ).toBe('https://black.invisionapp.com/meta-bff')
  })

  it('should return empty string for invalid shareurl domain', () => {
    global.URL = function () {
      return { origin: 'https://wrongurlstructure.com' }
    }
    let config = require('./config').default
    expect(
      config.getMetaUrl('https://wrongurlstructure.com/share/TESTIT')
    ).toBe('')
  })
})
