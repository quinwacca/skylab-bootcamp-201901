'use strict'

require('dotenv').config()

const { MongoClient, ObjectId } = require('mongodb')
const users = require('.')
const { expect } = require('chai')

const { env: { DB_URL } } = process

describe('user', () => {
    let client

    before(() =>
        MongoClient.connect(DB_URL, { useNewUrlParser: true })
            .then(_client => {
                client = _client
                users.collection = client.db().collection('users')
            })
    )

    beforeEach(() => users.collection.deleteMany())

    describe('add', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }

        it('should succeed on correct data', () =>
            users.add(_user)
                .then(id => {
                    expect(id).to.exist
                    expect(id).to.be.a('string')

                    return users.collection.findOne({ _id: ObjectId(id) })
                })
                .then(({ name, surname, email, password }) => {
                    expect(name).to.equal(_user.name)
                    expect(surname).to.equal(_user.surname)
                    expect(email).to.equal(_user.email)
                    expect(password).to.equal(_user.password)
                })
        )

        it('should throw error when user is not an object', () => {
            const user = 123
            expect(() => users.add(user)).to.throw(TypeError, `${user} is not an object`);
            
        })

        it('should throw error when user is empty', () => {
            const user = {}
            expect(() => users.add(user)).to.throw(Error, `object cannot be empty`);
            
        })
    })

    describe('findByEmail', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }

        let _insertedId
        
        it('should succeed on correct data', () =>
        users.collection.insertOne(_user)
            .then(res => _insertedId = res.insertedId.toString())
            .then(() => users.findByEmail(_user.email))
            .then(({ _id, name, surname, email, password }) => {
                expect(_id.toString()).to.equal(_insertedId.toString())
                expect(name).to.equal(_user.name)
                expect(surname).to.equal(_user.surname)
                expect(email).to.equal(_user.email)
                expect(password).to.equal(_user.password)
            })
        )

        it('should throw error when email is not a string', () => {
            const email = 123
            expect(() => users.findByEmail(email)).to.throw(TypeError, `${email} is not a string`);
            
        })

        it('should throw error when email is empty', () => {
            const email = ''
            expect(() => users.findByEmail(email)).to.throw(Error, `email cannot be empty`);
            
        })
    })

    describe('findById', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }

        let _insertedId
        
        it('should succeed on correct data', () =>
        users.collection.insertOne(_user)
            .then(res => _insertedId = res.insertedId.toString())
            .then(() => users.findById(_insertedId))
            .then(({ _id, name, surname, email, password }) => {
                expect(_id.toString()).to.equal(_insertedId.toString())
                expect(name).to.equal(_user.name)
                expect(surname).to.equal(_user.surname)
                expect(email).to.equal(_user.email)
                expect(password).to.equal(_user.password)
            })
        )
    })

    describe('update', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }

        const _updateData = {
            name: 'Elon',
            surname: 'Musk'
        }

        let _insertedId

        it('should succeed on correct data', () =>
        users.collection.insertOne(_user)
            .then(res => _insertedId = res.insertedId.toString())
            .then(() => users.update( _insertedId, _updateData ))
            .then(({ value: { _id: idToBeFinded } }) => users.collection.findOne({ _id: ObjectId(idToBeFinded.toString()) }))
            .then(({ _id, name, surname, email, password }) => {
                expect(_id.toString()).to.equal(_insertedId.toString())
                expect(name).to.equal(_updateData.name)
                expect(surname).to.equal(_updateData.surname)
                expect(email).to.equal(_user.email)
                expect(password).to.equal(_user.password)
            })
        )
    })

    describe('---DELETE---', () => {
        const _user = {
            name: 'Tachi',
            surname: 'Melodin',
            email: 'tachito',
            password: 'meguhtalagasssolina'
        }

        let _insertedId
        
        it('should succeed on delete document from collection', () =>
        users.collection.insertOne(_user)
            .then(res => _insertedId = res.insertedId.toString())
            .then(() => users.collection.findOne({ email: _user.email }))
            .then(({ _id, name, surname, email, password }) => {
                expect(_id.toString()).to.equal(_insertedId.toString())
                expect(name).to.equal(_user.name)
                expect(surname).to.equal(_user.surname)
                expect(email).to.equal(_user.email)
                expect(password).to.equal(_user.password)
            })
            .then(() => users.delete(_insertedId))
            .then(res => expect(res.result.ok).to.equal(1))

        )

        it('should throw error when email is not a string', () => {
            const email = 123
            expect(() => users.findByEmail(email)).to.throw(TypeError, `${email} is not a string`);
            
        })

        it('should throw error when email is empty', () => {
            const email = ''
            expect(() => users.findByEmail(email)).to.throw(Error, `email cannot be empty`);
            
        })
    })

    after(() =>
        users.collection.deleteMany()
            .then(() => client.close())
    )
})