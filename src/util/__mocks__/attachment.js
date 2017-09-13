const attachment = jest.genMockFromModule('../attachment.js')
attachment.meta.mockReturnValue(
  Promise.resolve({
    projectName: 'Mobile App Prototype',
    companyName: '',
    companyDomain: 'https://projects.invisionapp.com',
    screenName: 'Compose - Blank',
    screenCount: 28,
    previewUrl: 'https://projects.invisionapp.com/preview',
    commentUrl: 'https://projects.invisionapp.com/comments',
    inspectUrl: 'https://projects.invisionapp.com/inspect',
    userName: 'Yauhen Ivashkevich',
    lastUpdatedAt: 1503077755000,
    mobileDeviceName: 'iPhone',
    shareUrl: 'https://invis.io/28D3U4ZCP',
    previewImgUrl: 'https://s3.invisionapp-cdn.com/some.png'
  })
)
attachment.remove.mockReturnValue(Promise.resolve({}))

export default attachment
