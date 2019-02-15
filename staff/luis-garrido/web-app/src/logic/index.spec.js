'use strict'
const { expect } = require('chai')
const Logic = require('.')


describe('logic', () => {
    describe('register user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password
        const logic = new Logic

        it('should succeed on valid data', () =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(result => expect(result).not.to.exist)
        )

        it('should fail on undefined name', () => {
            const name = undefined
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, name + ' is not a string')
        })

        it('should fail on numeric name', () => {
            const name = 10
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, name + ' is not a string')
        })


        it('should fail on boolean name', () => {
            const name = true
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, name + ' is not a string')
        })

        it('should fail on object name', () => {
            const name = {}
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, name + ' is not a string')
        })

        it('should fail on array name', () => {
            const name = []
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, name + ' is not a string')
        })

        it('should fail on empty name', () => {
            const name = ''
            const surname = 'Barzi'
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(Error, 'name cannot be empty')
        })

        it('should fail on undefined surname', () => {
            const name = 'Manuel'
            const surname = undefined
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, surname + ' is not a string')
        })

        it('should fail on numeric surname', () => {
            const name = 'Manuel'
            const surname = 10
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, surname + ' is not a string')
        })


        it('should fail on boolean surname', () => {
            const name = 'Manuel'
            const surname = false
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, surname + ' is not a string')
        })

        it('should fail on object surname', () => {
            const name = 'Manuel'
            const surname = {}
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, surname + ' is not a string')
        })

        it('should fail on array surname', () => {
            const name = 'Manuel'
            const surname = []
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, surname + ' is not a string')
        })

        it('should fail on empty surname', () => {
            const name = 'Manuel'
            const surname = ''
            const email = 'manuelbarzi@mail.com'
            const password = '123'

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(Error, 'surname cannot be empty')
        })

        it('should fail on non string email', () => {
            let email = 3

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, email + ' is not a string')

        })

        it('should fail on empty email', () => {
            let email = ''

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(Error, 'email cannot be empty')

        })

        it('should fail on non string password', () => {
            let password = 3

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(TypeError, password + ' is not a string')

        })

        it('should fail on empty password', () => {
            let password = ''

            expect(() => {
                logic.registerUser(name, surname, email, password, password)
            }).to.throw(Error, 'password cannot be empty')

        })

        it('should fail on non string password confirmation', () => {
            let passwordc = 3

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordc)
            }).to.throw(TypeError, passwordc + ' is not a string')

        })

        it('should fail on empty password confirmation', () => {
            let passwordc = ''

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordc)
            }).to.throw(Error, 'password confirmation cannot be empty')

        })

        it('should fail on non coincident password and password confirmation', () => {
            let passwordc = 's'

            expect(() => {
                logic.registerUser(name, surname, email, password, passwordc)
            }).to.throw(Error, 'passwords do not match')

        })
    })

    describe('log in user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password
        const logic = new Logic

        before(() =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
        )

        it('should succeed on correct credentials', () =>
            logic.logInUser(email, password)
                .then(() => {
                    expect(logic.__storage__.userId).to.exist
                    expect(logic.__storage__.userApiToken).to.exist
                })
        )

        it('should fail on non string email', () => {
            let email = 3

            expect(() => {
                logic.logInUser(email, password)
            }).to.throw(TypeError, email + ' is not a string')

        })

        it('should fail on empty email', () => {
            let email = ''

            expect(() => {
                logic.logInUser(email, password)
            }).to.throw(Error, 'email cannot be empty')

        })

        it('should fail on non string password', () => {
            let password = 3

            expect(() => {
                logic.logInUser(email, password)
            }).to.throw(TypeError, password + ' is not a string')

        })

        it('should fail on empty password', () => {
            let password = ''

            expect(() => {
                logic.logInUser(email, password)
            }).to.throw(Error, 'password cannot be empty')

        })

    })

    describe('check user is logged in', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password
        const logic = new Logic

        beforeEach(() =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
        )

        it('should succeed on correct credentials', () =>
            logic.logInUser(email, password)
                .then(() => expect(logic.isUserLoggedIn).to.be.true)
        )
    })

    describe('log out user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password
        const logic = new Logic

        beforeEach(() =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.logInUser(email, password))
        )

        it('should succeed on correct credentials', () => {
            logic.logOutUser()

            expect(logic.__storage__.userId).to.be.null
            expect(logic.__storage__.userId).to.be.null
        })
    })

    describe('retrieve user', () => {
        const name = 'Manuel'
        const surname = 'Barzi'
        const email = `manuelbarzi@mail.com-${Math.random()}`
        const password = '123'
        const passwordConfirm = password
        const logic = new Logic

        beforeEach(() =>
            logic.registerUser(name, surname, email, password, passwordConfirm)
                .then(() => logic.logInUser(email, password))
        )

        it('should succeed on correct credentials', () =>
            logic.retrieveUser()
                .then(user => {
                    expect(user.id).to.equal(logic.__storage__.userId)
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                })
        )
    })

    // TODO updateUser and removeUser
})