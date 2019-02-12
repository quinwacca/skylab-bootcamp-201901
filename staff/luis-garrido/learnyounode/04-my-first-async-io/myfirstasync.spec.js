const { expect } = require('chai')
const jumps = require('./myfirstasync')

describe('my first async', () => {
    it('should succeed on correct line jumping', (done) => {
        path = __dirname+'./yep.txt'
        console.log(path)
        const res = jumps(path)

        expect(res).to.equal(3)
        console.log('AAAA', res)
        done()
    })
})