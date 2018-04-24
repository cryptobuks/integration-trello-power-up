import { isInVisionUrl } from './url.js'

const validUrls = [
  'https://in-v6.preview.invisionapp.com/prototype/Slack-Integration-v7-cje6539090003on0op02qgh50',
  'https://in-v7.invisionapp.com/prototype/firetruck-cjeadm21700093y0pxpbyzlsf',
  'https://design.invisionapp.com/prototype/Slack-Integration-v7-cjekd47ui00026a0q0ofvab6c/',
  'https://ent.invisionbeta.com/share/5JD97E4',
  'https://invis.io/NQ8979O8R',
  'https://projects.invisionapp.com/share/2B7ZYDVZ3',
  'https://in.invisionapp.com/share/X28MGQD4Y',
  'https://projects.staging.invision.works/share/2B7ZYDVZ3',
  'https://projects.testing10.testing.invision.works/share/GW5ZE',
  'http://projects.local.invisionapp.com/share/TK3YM',
  'http://projects.local.invisionapp.com/share/TK3YM/538_Intro',
  'https://amazing.invisionbeta.com/public/share/87WTI4SMT',
  'https://amazing.invisionbeta.com/public/share/87WTI4SMT#screens/12345'
]

validUrls.forEach(url => {
  test(`${url} should be valid`, () => {
    expect(isInVisionUrl(url)).toBe(true)
  })
})

test('invalid url', () => {
  expect(isInVisionUrl('https://google.com')).toBe(false)
})
