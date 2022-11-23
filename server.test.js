//const sum = require('./server.js')
const sum = (a, b) => a+b
test('properly adds two numbers', () => {
    expect(sum(4, 5)).toBe(9)
})