const { expect } = require('chai')
const jumps = require('./myfirstio')

describe('my first io', () => {
    it('should succeed on correct line jumping', () => {
        path = './yep.txt'

        const res = jumps(path)

        expect(res).to.equal(3)
    })
})