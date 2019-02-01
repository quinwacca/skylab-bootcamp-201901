'use strict'

import userApi from '.'

describe('user api', () => {
    const username = `manuelbarzi-${Math.random()}`
    const password = '123'
    let userId = ""
    let userToken = ""

    // -----------------------------REGISTER----------------------------------
    describe('register', () => {
        it('should succeed on correct data', () =>
            userApi.register(username, password)
                .then(id => {
                    expect(id).toBeDefined()
                    userId = id
                })
                .catch(error => expect(error).toBeUndefined())
        )

        it('should fail on already existing user', () =>
            userApi.register(username, password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username \"${username}\" already exists`)
                })
        )
    })

    // -----------------------------LOGIN----------------------------------
    describe('login', () => {
        it('should succeed on correct authentication, correct ID received', () =>
            userApi.login(username, password)
                .then(data => expect(data.id).toBe(userId))
                .catch(error => expect(error).toBeUndefined())
        )

        it('should receive a token', () =>
            userApi.login(username, password)
                .then(data => {
                    expect(data.token).toBeDefined()
                    userToken = data.token
                })
        )
        
        it('should fail on non correct password', () =>
            userApi.login(username, "tratra")
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`username and/or password wrong`)
                })
        )

        it('should fail on non correct user', () =>
            userApi.login("lalala", password)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`user with username \"lalala"\ does not exist`)
                })
        )
    })

    // -----------------------------RETRIEVE----------------------------------
    describe('retrieve', () => {
        it('should retrieve the correct username', () => {
                        
            userApi.retrieve(userId)
            .then(usernameReceived => expect(usernameReceived).toBe(username))
            .catch(error => expect(error).toBeUndefined())
        })
        
        it('should fail on non authorized token', () => {
            userApi.token = 'ey'
            
            userApi.retrieve(userId)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`invalid token`)
                })
        })

        it('should fail on non correct id to retrieve data from', () => {
            const fakeId = "jadsjklasdkljds"

            userApi.retrieve(fakeId)
                .then(() => {
                    throw Error('should not have passed by here')
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    expect(error.message).toBe(`token id \"${userId}\" does not match user \"${fakeId}\"`)
                })
        })
    })

    // -----------------------------UPDATE----------------------------------
    // describe('update', () => {
    //     it('should correctly update age of user'), () => {

    //     }
    // })

})

