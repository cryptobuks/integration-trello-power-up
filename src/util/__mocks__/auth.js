const auth = jest.genMockFromModule('../auth.js')
auth.token.mockReturnValue(Promise.resolve('some_token'))
export default auth
