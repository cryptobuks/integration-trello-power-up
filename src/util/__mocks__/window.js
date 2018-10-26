const window = {
  location: {
    hash: {
      substring: jest.fn()
    }
  },
  localStorage: {
    setItem: jest.fn()
  },
  opener: {
    authorize: jest.fn()
  },
  close: jest.fn()
}

export default window
