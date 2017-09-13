import { isInVisionUrl } from './url.js'

test('https://invis.io/NQ8979O8R', () => {
  expect(isInVisionUrl('https://invis.io/NQ8979O8R')).toBe(true)
})

test('https://projects.invisionapp.com/share/2B7ZYDVZ3', () => {
  expect(
    isInVisionUrl('https://projects.invisionapp.com/share/2B7ZYDVZ3')
  ).toBe(true)
})

test('https://in.invisionapp.com/share/X28MGQD4Y', () => {
  expect(isInVisionUrl('https://in.invisionapp.com/share/X28MGQD4Y')).toBe(true)
})

test('https://projects.staging.invision.works/share/2B7ZYDVZ3', () => {
  expect(
    isInVisionUrl('https://projects.staging.invision.works/share/2B7ZYDVZ3')
  ).toBe(true)
})

test('https://projects.testing10.testing.invision.works/share/GW5ZE', () => {
  expect(
    isInVisionUrl(
      'https://projects.testing10.testing.invision.works/share/GW5ZE'
    )
  ).toBe(true)
})

test('http://projects.local.invisionapp.com/share/TK3YM', () => {
  expect(
    isInVisionUrl('https://projects.local.invisionapp.com/share/TK3YM')
  ).toBe(true)
})

test('http://projects.local.invisionapp.com/share/TK3YM/538_Intro', () => {
  expect(
    isInVisionUrl(
      'https://projects.local.invisionapp.com/share/TK3YM/538_Intro'
    )
  ).toBe(true)
})

test('https://google.com', () => {
  expect(isInVisionUrl('https://google.com')).toBe(false)
})
