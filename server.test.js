const sum = require('./server.js')

test('properly adds two numbers', () => {
    expect(sum(4, 5)).toBe(9)
})