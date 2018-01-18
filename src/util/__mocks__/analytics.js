const original = require.requireActual('../analytics.js')
const analytics = Object.assign({}, original.default, { track: jest.fn() })

export default analytics
