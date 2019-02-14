'use strict'

const { expect } = require('chai')
const userApi = require('.')

describe('user api', () => {
    describe('register', () => {
        let name = 'Manuel'
        let surname = 'Barzi'
        let username = `manuelbarzi-${Math.random()}`
        let password = '123'

        before(()=> {
            name = 'Manuel'
            surname = 'Barzi'
            username = `manuelbarzi-${Math.random()}`
            password = '123'
        })

        it('should succeed on correct data', () =>
            userApi.register(name, surname, username, password)
                .then(id => expect(id).to.exist)
        )

        it('should fail on already existing user', () =>
            userApi.register(name, surname, username, password)
                // .then(() => {
                //     throw Error('should not have passed by here')
                // })
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal(`user with username \"${username}\" already exists`)
                })
        )

        it('should fail on non string name', () => {
            let name = 3

            expect(() => {
                userApi.register(name, surname, username, password)
            }).to.throw(TypeError, name + ' is not a string')

        })

        it('should fail on empty name', () => {
            let name = ''

            expect(() => {
                userApi.register(name, surname, username, password)
            }).to.throw(Error, 'name is empty')

        })

        it('should fail on non string surname', () => {
            let surname = 3

            expect(() => {
                userApi.register(name, surname, username, password)
            }).to.throw(TypeError, surname + ' is not a string')

        })

        it('should fail on empty surname', () => {
            let surname = ''

            expect(() => {
                userApi.register(name, surname, username, password)
            }).to.throw(Error, 'surname is empty')

        })

        it('should fail on non string username', () => {
            let username = 3

            expect(() => {
                userApi.register(name, surname, username, password)
            }).to.throw(TypeError, username + ' is not a string')

        })

        it('should fail on empty username', () => {
            let username = ''

            expect(() => {
                userApi.register(name, surname, username, password)
            }).to.throw(Error, 'username is empty')

        })

        it('should fail on non string password', () => {
            let password = 3

            expect(() => {
                userApi.register(name, surname, username, password)
            }).to.throw(TypeError, password + ' is not a string')

        })

        it('should fail on empty password', () => {
            let password = ''

            expect(() => {
                userApi.register(name, surname, username, password)
            }).to.throw(Error, 'password is empty')

        })
    })

    describe('authenticate', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'

        let _id

        before(() =>
        userApi.register(name, surname, username, password)
            .then(id => _id = id)
        )

        it('should succeed on correct data', () =>
            userApi.authenticate(username, password)
                .then(({ id, token }) => {
                    expect(id).to.equal(_id)
                    expect(token).to.exist
                })
        )
        
        it('should fail on non string username', () => {
            let username = 3

            expect(() => {
                userApi.authenticate(username, password)
            }).to.throw(TypeError, username + ' is not a string')

        })

        it('should fail on empty username', () => {
            let username = ''

            expect(() => {
                userApi.authenticate(username, password)
            }).to.throw(Error, 'username is empty')

        })

        it('should fail on non string password', () => {
            let password = 3

            expect(() => {
                userApi.authenticate(username, password)
            }).to.throw(TypeError, password + ' is not a string')

        })

        it('should fail on empty password', () => {
            let password = ''

            expect(() => {
                userApi.authenticate(username, password)
            }).to.throw(Error, 'password is empty')

        })

        it('should fail on wrong username', () => {
            let username = 'hulio'
            
            userApi.authenticate(username, password)
                // .then(() => {
                //     throw Error('should not have passed by here')
                // })
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal(`user with username "${username}" does not exist`)
                })
        })

        // TODO more unit test cases
    })

    describe('retrieve', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'

        let _id, _token

        before(() =>
            userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        )

        it('should succeed on correct data', () =>
            userApi.retrieve(_id, _token)
                .then(user => {
                    expect(user.id).to.equal(_id)
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.username).to.equal(username)
                })
        )
        
        it('should fail on non string id', () => {
            let _id = 3

            expect(() => {
                userApi.retrieve(_id, _token)
            }).to.throw(TypeError, _id + ' is not a string')

        })

        it('should fail on empty id', () => {
            let _id = ''

            expect(() => {
                userApi.retrieve(_id, _token)
            }).to.throw(Error, 'id is empty')

        })

        it('should fail on non string token', () => {
            let _token = 3

            expect(() => {
                userApi.retrieve(_id, _token)
            }).to.throw(TypeError, _token + ' is not a string')

        })

        it('should fail on empty token', () => {
            let _token = ''

            expect(() => {
                userApi.retrieve(_id, _token)
            }).to.throw(Error, 'token is empty')

        })
        // TODO more unit test cases
    })

    describe('update', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'

        let _id, _token

        before(() =>
            userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        )

        it('should succeed on correct data', () => {
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 }

            return userApi.update(_id, _token, data)
                .then(() => userApi.retrieve(_id, _token))
                .then(user => {
                    expect(user.id).to.equal(_id)
                    expect(user.name).to.equal(data.name)
                    expect(user.surname).to.equal(data.surname)
                    expect(user.age).to.equal(data.age)
                    expect(user.username).to.equal(username)
                })
        })

        it('should fail on non string id', () => {
            let _id = 3
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 }

            expect(() => {
                userApi.update(_id, _token, data)
            }).to.throw(TypeError, _id + ' is not a string')

        })

        it('should fail on empty id', () => {
            let _id = ''
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 }

            expect(() => {
                userApi.update(_id, _token, data)
            }).to.throw(Error, 'id is empty')

        })

        it('should fail on non string token', () => {
            let _token = 3
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 }

            expect(() => {
                userApi.update(_id, _token, data)
            }).to.throw(TypeError, _token + ' is not a string')

        })

        it('should fail on empty token', () => {
            let _token = ''
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 }

            expect(() => {
                userApi.update(_id, _token, data)
            }).to.throw(Error, 'token is empty')

        })

        it('should fail on non object data', () => {
            const data = 42

            expect(() => {
                userApi.update(_id, _token, data)
            }).to.throw(TypeError, `${data} is not an object`)

        })

        it('should fail on wrong id', () => {
            let _id2 = 'hulio'
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 }
            
            userApi.update(_id2, _token, data)
                // .then(() => {
                //     throw Error('should not have passed by here')
                // })
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal(`token id "${_id}" does not match user "${_id2}"`)
                })
        })
        // TODO more unit test cases
    })

    describe('remove', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const username = `manuelbarzi-${Math.random()}`
        const password = '123'

        let _id, _token

        before(() =>
            userApi.register(name, surname, username, password)
                .then(id => _id = id)
                .then(() => userApi.authenticate(username, password))
                .then(({ token }) => _token = token)
        )

        it('should succeed on correct data', () => {
            return userApi.remove(_id, _token, username, password)
                .then(() => userApi.retrieve(_id, _token))
                // .then(() => {
                //     throw Error('should not pass by here')
                // })
                .catch(({message}) => expect(message).to.equal(`user with id \"${_id}\" does not exist`))
        })

        it('should fail on non string id', () => {
            let _id = 3

            expect(() => {
                userApi.remove(_id, _token, username, password)
            }).to.throw(TypeError, _id + ' is not a string')

        })

        it('should fail on empty id', () => {
            let _id = ''

            expect(() => {
                userApi.remove(_id, _token, username, password)
            }).to.throw(Error, 'id is empty')

        })

        it('should fail on non string token', () => {
            let _token = 3

            expect(() => {
                userApi.remove(_id, _token, username, password)
            }).to.throw(TypeError, _token + ' is not a string')

        })

        it('should fail on empty token', () => {
            let _token = ''

            expect(() => {
                userApi.remove(_id, _token, username, password)
            }).to.throw(Error, 'token is empty')

        })

        it('should fail on non string username', () => {
            let username = 3

            expect(() => {
                userApi.remove(_id, _token, username, password)
            }).to.throw(TypeError, username + ' is not a string')

        })

        it('should fail on empty username', () => {
            let username = ''

            expect(() => {
                userApi.remove(_id, _token, username, password)
            }).to.throw(Error, 'username is empty')

        })

        it('should fail on non string password', () => {
            let password = 3

            expect(() => {
                userApi.remove(_id, _token, username, password)
            }).to.throw(TypeError, password + ' is not a string')

        })

        it('should fail on empty password', () => {
            let password = ''

            expect(() => {
                userApi.remove(_id, _token, username, password)
            }).to.throw(Error, 'password is empty')

        })

        it('should fail on wrong id', () => {
            let _id2 = 'hulio'
            const data = { name: 'Pepito', surname: 'Grillo', age: 32 }
            
            userApi.remove(_id2, _token, username, password)
                // .then(() => {
                //     throw Error('should not have passed by here')
                // })
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal(`token id "${_id}" does not match user "${_id2}"`)
                })
        })
        // TODO more unit test cases
    })
})