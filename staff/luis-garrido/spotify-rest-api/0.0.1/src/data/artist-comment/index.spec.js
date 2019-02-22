"use strict";

const fsp = require("fs").promises;
const uuid = require("uuid");

const expect = require("expect");

const artistComment = require(".");

describe("artist comments data", () => {
    beforeEach(() => fsp.writeFile(artistComment.file, JSON.stringify([])));

    // beforeEach(async () => {
    //     await artistComment.write(artistComment.file, [])
    // })

    //-------READ TEST---------------

    describe("read", () => {
        const comments = [
            {
                id: uuid(),
                userId: `userId-${Math.random()}`,
                artistId: `artistId-${Math.random()}`,
                text: `comment ${Math.random()}`,
                date: new Date()
            },
            {
                id: uuid(),
                userId: `userId-${Math.random()}`,
                artistId: `artistId-${Math.random()}`,
                text: `comment ${Math.random()}`,
                date: new Date()
            },
            {
                id: uuid(),
                userId: `userId-${Math.random()}`,
                artistId: `artistId-${Math.random()}`,
                text: `comment ${Math.random()}`,
                date: new Date()
            }
        ];

        beforeEach(() =>
            fsp.writeFile(artistComment.file, JSON.stringify(comments))
        );

        it("should succeed on correct file path", () =>
            artistComment.read(artistComment.file).then(_comments => {
                expect(_comments).toBeDefined();
                expect(_comments.length).toBe(comments.length);

                _comments.forEach(
                    ({ id, userId, artistId, text, date }, index) => {
                        expect(id).toBe(comments[index].id);
                        expect(userId).toBe(comments[index].userId);
                        expect(artistId).toBe(comments[index].artistId);
                        expect(text).toBe(comments[index].text);
                        expect(date).toBe(comments[index].date.toISOString());
                    }
                );
            }));

        it("should throw an error when receiving array instead of string", () => {
            let fileArray = [];
            try {
                artistComment.read(fileArray).then(() => {});
            } catch (error) {
                expect(error).toBeDefined();
                expect(error instanceof TypeError).toBeTruthy();
                expect(error.message).toBe(`${fileArray} is not a string`);
            }
        });

        it("should throw an error when receiving an empty string", () => {
            let fileString = "";
            try {
                artistComment.read(fileString).then(() => {});
            } catch (error) {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error.message).toBe(`${fileString} is empty`);
            }
        });
    });

    //------------------- WRITE ----------------------

    describe("write", () => {
        const comments = [
            {
                id: uuid(),
                userId: `userId-${Math.random()}`,
                artistId: `artistId-${Math.random()}`,
                text: `comment ${Math.random()}`,
                date: new Date()
            },
            {
                id: uuid(),
                userId: `userId-${Math.random()}`,
                artistId: `artistId-${Math.random()}`,
                text: `comment ${Math.random()}`,
                date: new Date()
            },
            {
                id: uuid(),
                userId: `userId-${Math.random()}`,
                artistId: `artistId-${Math.random()}`,
                text: `comment ${Math.random()}`,
                date: new Date()
            }
        ];

        it("should succeed on correct file path", () =>
            artistComment
                .write(artistComment.file, comments)
                .then(() => fsp.readFile(artistComment.file))
                .then(content => JSON.parse(content))
                .then(_comments => {
                    expect(_comments).toBeDefined();
                    expect(_comments.length).toBe(comments.length);

                    _comments.forEach(
                        ({ id, userId, artistId, text, date }, index) => {
                            expect(id).toBe(comments[index].id);
                            expect(userId).toBe(comments[index].userId);
                            expect(artistId).toBe(comments[index].artistId);
                            expect(text).toBe(comments[index].text);
                            expect(date).toBe(
                                comments[index].date.toISOString()
                            );
                        }
                    );
                }));

        it("should throw an error when receiving object instead of array", () => {
            let commentsObject = {};
            try {
                artistComment.write(artistComment.file, commentsObject).then(() => {});
            } catch (error) {
                expect(error).toBeDefined();
                expect(error instanceof Error).toBeTruthy();
                expect(error.message).toBe(`${commentsObject} is not an array`);
            }
        });
    });

    //---------------------ADD-----------------------

    describe("add", () => {
        const comment = {
            artistId: `artistId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date()
        };

        it('should succeed on correct data', () =>
            artistComment.add(comment)
                .then(() => {
                    expect(comment.id).toBeDefined()

                    return fsp.readFile(artistComment.file)
                })
                .then(content => JSON.parse(content))
                .then(comments => {
                    expect(comments).toBeDefined()
                    expect(comments.length).toBe(1)

                    const [{ id, userId, artistId, text, date }] = comments

                    expect(id).toBe(comment.id)
                    expect(userId).toBe(comment.userId)
                    expect(artistId).toBe(comment.artistId)
                    expect(text).toBe(comment.text)
                    expect(date).toBe(comment.date.toISOString())
                })
        )
        
        it('should thrown an error using string instead of object', () => {
            let commentString = ''

            try {
                return artistComment.add(commentString)
                .then(() => {
                    throw Error(`--NOT SHOULD PASS BY HERE--`);
                })
            } catch (error) {
                expect(error).toBeDefined()
                expect(error instanceof TypeError).toBeTruthy()
                expect(error.message).toBe(`${commentString} is not an object`)
            }
        })
    })

    //--------------RETRIEVE-------------------

    describe("retrieve", () => {
        const comment = {
            id: uuid(),
            artistId: `artistId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date
        }

        // beforeEach(() => artistComment.add(comment));
        beforeEach(() =>
            fsp.writeFile(artistComment.file, JSON.stringify([comment]))
        )

        it("should succeed on correct commend id", () =>
            artistComment
                .retrieve(comment.id)
                .then(({ id, artistId, userId, text, date }) => {
                    expect(id).toBe(comment.id);
                    expect(artistId).toBe(comment.artistId);
                    expect(userId).toBe(comment.userId);
                    expect(text).toBe(comment.text);
                    expect(date).toBe(comment.date.toISOString());
                }));

        it("should return error if comment id no exist", () => {
            const commentIdFake = "123123123";
            artistComment
                .retrieve(commentIdFake)
                .then(() => {
                    throw Error(`--NOT SHOULD PASS BY HERE--`);
                })
                .catch(error =>
                    expect(error.message).toBe(
                        `Comment with ID "${commentIdFake}" doesn't exist`
                    )
                );
        });

        it('should thrown an error using an empty string', () => {
            let commentIdEmptyString = ''
            try {
                artistComment.retrieve(commentIdEmptyString)
                    .then(() => {
                        throw Error(`--NOT SHOULD PASS BY HERE--`);
                    })
            } catch (error) {
                expect(error).toBeDefined()
                expect(error instanceof Error).toBeTruthy()
                expect(error.message).toBe(`${commentIdEmptyString} is empty`)
            }
        })

        it('should thrown an error using an array instead of string', () => {
            let commentIdArray = [1, 2, 3]
            try {
                artistComment.retrieve(commentIdArray)
                    .then(() => {
                        throw Error(`--NOT SHOULD PASS BY HERE--`);
                    })
            } catch (error) {
                expect(error).toBeDefined()
                expect(error instanceof TypeError).toBeTruthy()
                expect(error.message).toBe(`${commentIdArray} is not a string`)
            }
        })
    });

    //--------------------UPDATE----------------------

    describe("update", () => {
        const comment = {
            artistId: `artistId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date()
        };

        beforeEach(() => artistComment.add(comment));

        it("should succeed on correct data", () => {
            comment.text += "-NEW";

            return artistComment
                .update(comment)
                .then(() => artistComment.retrieve(comment.id))
                .then(({ id, artistId, userId, text, date }) => {
                    expect(id).toBe(comment.id);
                    expect(artistId).toBe(comment.artistId);
                    expect(userId).toBe(comment.userId);
                    expect(text).toBe(comment.text);
                    expect(date.toString()).toBe(comment.date.toISOString());
                });
        });
    });

    // describe('update', () => {
    //     const comment = {
    //         id: uuid(),
    //         artistId: `artistId-${Math.random()}`,
    //         userId: `userId-${Math.random()}`,
    //         text: `comment ${Math.random()}`,
    //         date: new Date
    //     }

    //     beforeEach(() =>
    //         // artistComment.add(comment) // FATAL each test should test ONE unit
    //         fsp.writeFile(file, JSON.stringify([comment]))
    //     )

    //     it('should succeed on correct data', () => {
    //         comment.text += '-NEW'

    //         return artistComment.update(comment)
    //             .then(() => fsp.readFile(file))
    //             .then(content => JSON.parse(content))
    //             .then(comments => comments.find(_comment => _comment.id === comment.id))
    //             .then(({ id, artistId, userId, text, date }) => {
    //                 expect(id).toBe(comment.id)
    //                 expect(artistId).toBe(comment.artistId)
    //                 expect(userId).toBe(comment.userId)
    //                 expect(text).toBe(comment.text)
    //                 expect(date).toBe(comment.date.toISOString())
    //             })
    //     })

    //     it('should thrown an error using an empty string', () => {
    //         let commentEmptyString = ''
    //         try {
    //             artistComment.update(commentEmptyString)
    //                 .then(() => { })
    //         } catch (error) {
    //             expect(error).toBeDefined()
    //             expect(error instanceof TypeError).toBeTruthy()
    //             expect(error.message).toBe(`${commentEmptyString} is not an object`)
    //         }
    //     })
    // })

    //----------------DELETE----------------------------------

    describe("delete", () => {
        const comment = {
            artistId: `artistId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date()
        };

        beforeEach(() => artistComment.add(comment));

        it("should succeed on correct comment id", () => {
            return artistComment
                .delete(comment.id)
                .then(() => artistComment.retrieve(comment.id))
                .then(() => {
                    throw Error(`--NOT SHOULD PASS BY HERE--`);
                })
                .catch(error =>
                    expect(error.message).toBe(
                        `Comment with ID "${comment.id}" doesn't exist`
                    )
                );
        });
    });

    describe("find", () => {
        const comment = {
            artistId: `artistId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date()
        };

        const comment2 = {
            artistId: `artistId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date()
        };

        const comment3 = {
            artistId: `artistId-${Math.random()}`,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date()
        };

        const comment4 = {
            artistId: comment2.artistId,
            userId: `userId-${Math.random()}`,
            text: `comment ${Math.random()}`,
            date: new Date()
        };

        const comment5 = {
            artistId: comment2.artistId,
            userId: `userId-5-${Math.random()}`,
            text: comment4.text,
            date: new Date()
        };

        beforeEach(() =>
            artistComment
                .add(comment)
                .then(() => artistComment.add(comment2))
                .then(() => artistComment.add(comment3))
                .then(() => artistComment.add(comment4))
                .then(() => artistComment.add(comment5))
        );

        it("should succeed on correct criteria by id", () =>
            artistComment.find({ id: comment2.id }).then(comments => {
                expect(comments).toBeDefined();
                expect(comments.length).toBe(1);

                const [{ id, artistId, userId, text, date }] = comments;

                expect(id).toBe(comment2.id);
                expect(artistId).toBe(comment2.artistId);
                expect(userId).toBe(comment2.userId);
                expect(text).toBe(comment2.text);
                expect(date).toBe(comment2.date.toISOString());
            }));

        it("should succeed on correct criteria by artist id", () =>
            artistComment
                .find({ artistId: comment2.artistId })
                .then(comments => {
                    expect(comments).toBeDefined();
                    expect(comments.length).toBe(3);

                    const [_comment, _comment2, _comment3] = comments;

                    expect(_comment.id).toBe(comment2.id);
                    expect(_comment.artistId).toBe(comment2.artistId);
                    expect(_comment.userId).toBe(comment2.userId);
                    expect(_comment.text).toBe(comment2.text);
                    expect(_comment.date).toBe(comment2.date.toISOString());

                    expect(_comment2.id).toBe(comment4.id);
                    expect(_comment2.artistId).toBe(comment4.artistId);
                    expect(_comment2.userId).toBe(comment4.userId);
                    expect(_comment2.text).toBe(comment4.text);
                    expect(_comment2.date).toBe(comment4.date.toISOString());

                    expect(_comment3.id).toBe(comment5.id);
                    expect(_comment3.artistId).toBe(comment5.artistId);
                    expect(_comment3.userId).toBe(comment5.userId);
                    expect(_comment3.text).toBe(comment5.text);
                    expect(_comment3.date).toEqual(comment5.date.toISOString());
                }));

        it("should succeed on correct criteria by artist id and comment text", () =>
            artistComment
                .find({ artistId: comment2.artistId, text: comment4.text })
                .then(comments => {
                    expect(comments).toBeDefined();
                    expect(comments.length).toBe(2);

                    const [_comment, _comment2] = comments;

                    expect(_comment.id).toBe(comment4.id);
                    expect(_comment.artistId).toBe(comment4.artistId);
                    expect(_comment.userId).toBe(comment4.userId);
                    expect(_comment.text).toBe(comment4.text);
                    expect(_comment.date).toBe(comment4.date.toISOString());

                    expect(_comment2.id).toBe(comment5.id);
                    expect(_comment2.artistId).toBe(comment5.artistId);
                    expect(_comment2.userId).toBe(comment5.userId);
                    expect(_comment2.text).toBe(comment5.text);
                    expect(_comment2.date).toEqual(comment5.date.toISOString());
                }));
    });

    after(async () => {
        await artistComment.write(artistComment.file, []);
    });
});
