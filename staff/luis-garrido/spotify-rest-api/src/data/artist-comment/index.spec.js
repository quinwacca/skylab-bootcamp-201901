'use strict'

const expect = require('expect')


const artistComment = require('.')

describe('artist comments data', () => {

    beforeEach(async () => {
        await artistComment.write(artistComment.file, [])
    })

    describe('add', () => {
        const comment = {
            artistId: `artistId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        it('should succeed on correct data', () => {
            artistComment.add(comment)
                .then(() => artistComment.retrieve(comment.id))
                .then(({ id, artistId, userId, text, date }) => {
                    expect(id).toBe(comment.id)
                    expect(artistId).toBe(comment.artistId)
                    expect(userId).toBe(comment.userId)
                    expect(text).toBe(comment.text)
                    expect(date).toBe(comment.date.toISOString())
                })
        })
    })

    describe('retrieve', () => {
        const comment = {
            artistId: `artistId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        beforeEach(() =>
            artistComment.add(comment)
        )

        it('should succeed on correct commend id', () =>
            artistComment.retrieve(comment.id)
                .then(({ id, artistId, userId, text, date }) => {
                    expect(id).toBe(comment.id)
                    expect(artistId).toBe(comment.artistId)
                    expect(userId).toBe(comment.userId)
                    expect(text).toBe(comment.text)
                    expect(date).toBe(comment.date.toISOString())
                })
        )

        it('should return error if comment id no exist', () => {
            const commentIdFake = '123123123'
            artistComment.retrieve(commentIdFake)
            .then(() => {
                throw Error(`--NOT SHOULD PASS BY HERE--`);
            })
            .catch(error =>
                expect(error.message).toBe(`Comment with ID "${commentIdFake}" doesn't exist`)

            )
        })


    })

    describe('update', () => {
        const comment = {
            artistId: `artistId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        beforeEach(() =>
            artistComment.add(comment)
        )

        it('should succeed on correct data', () => {
            comment.text += '-NEW'

            return artistComment.update(comment)
                .then(() => artistComment.retrieve(comment.id))
                .then(({ id, artistId, userId, text, date }) => {
                    expect(id).toBe(comment.id)
                    expect(artistId).toBe(comment.artistId)
                    expect(userId).toBe(comment.userId)
                    expect(text).toBe(comment.text)
                    expect(date.toString()).toBe(comment.date.toISOString())
                })
        })
    })

    describe('delete', () => {
        const comment = {
            artistId: `artistId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        beforeEach(() =>
            artistComment.add(comment)
        )

        it('should succeed on correct comment id', () => {
            return artistComment.delete(comment.id)
                .then(() => artistComment.retrieve(comment.id))
                .then(() => {
                    throw Error(`--NOT SHOULD PASS BY HERE--`);
                })
                .catch(error =>
                    expect(error.message).toBe(`Comment with ID "${comment.id}" doesn't exist`)
    
                )
        })
    })

    describe('find', () => {
        const comment = {
            artistId: `artistId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        const comment2 = {
            artistId: `artistId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        const comment3 = {
            artistId: `artistId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        const comment4 = {
            artistId: comment2.artistId,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        const comment5 = {
            artistId: comment2.artistId,
            userId: `userId-5-${Math.random()}`,
            text: comment4.text,
            date: new Date
        }

        beforeEach(() =>
            artistComment.add(comment)
                .then(() => artistComment.add(comment2))
                .then(() => artistComment.add(comment3))
                .then(() => artistComment.add(comment4))
                .then(() => artistComment.add(comment5))
        )

        it('should succeed on correct criteria by id', () =>
            artistComment.find({ id: comment2.id })
                .then(comments => {
                    expect(comments).toBeDefined()
                    expect(comments.length).toBe(1)

                    const [{ id, artistId, userId, text, date }] = comments

                    expect(id).toBe(comment2.id)
                    expect(artistId).toBe(comment2.artistId)
                    expect(userId).toBe(comment2.userId)
                    expect(text).toBe(comment2.text)
                    expect(date).toBe(comment2.date.toISOString())
                })
        )

        it('should succeed on correct criteria by artist id', () =>
            artistComment.find({ artistId: comment2.artistId })
                .then(comments => {
                    expect(comments).toBeDefined()
                    expect(comments.length).toBe(3)

                    const [_comment, _comment2, _comment3] = comments

                    expect(_comment.id).toBe(comment2.id)
                    expect(_comment.artistId).toBe(comment2.artistId)
                    expect(_comment.userId).toBe(comment2.userId)
                    expect(_comment.text).toBe(comment2.text)
                    expect(_comment.date).toBe(comment2.date.toISOString())

                    expect(_comment2.id).toBe(comment4.id)
                    expect(_comment2.artistId).toBe(comment4.artistId)
                    expect(_comment2.userId).toBe(comment4.userId)
                    expect(_comment2.text).toBe(comment4.text)
                    expect(_comment2.date).toBe(comment4.date.toISOString())

                    expect(_comment3.id).toBe(comment5.id)
                    expect(_comment3.artistId).toBe(comment5.artistId)
                    expect(_comment3.userId).toBe(comment5.userId)
                    expect(_comment3.text).toBe(comment5.text)
                    expect(_comment3.date).toEqual(comment5.date.toISOString())
                })
        )

        it('should succeed on correct criteria by artist id and comment text', () =>
            artistComment.find({ artistId: comment2.artistId, text: comment4.text })
                .then(comments => {
                    expect(comments).toBeDefined()
                    expect(comments.length).toBe(2)

                    const [_comment, _comment2] = comments

                    expect(_comment.id).toBe(comment4.id)
                    expect(_comment.artistId).toBe(comment4.artistId)
                    expect(_comment.userId).toBe(comment4.userId)
                    expect(_comment.text).toBe(comment4.text)
                    expect(_comment.date).toBe(comment4.date.toISOString())

                    expect(_comment2.id).toBe(comment5.id)
                    expect(_comment2.artistId).toBe(comment5.artistId)
                    expect(_comment2.userId).toBe(comment5.userId)
                    expect(_comment2.text).toBe(comment5.text)
                    expect(_comment2.date).toEqual(comment5.date.toISOString())

                })
        )
    })

    after(async () => {
        await artistComment.write(artistComment.file, [])
    })

})