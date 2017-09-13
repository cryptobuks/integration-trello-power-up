const cover = jest.genMockFromModule('../cover.js')
cover.remove.mockReturnValue(Promise.resolve({}))
cover.make.mockReturnValue(Promise.resolve({}))

export default cover
