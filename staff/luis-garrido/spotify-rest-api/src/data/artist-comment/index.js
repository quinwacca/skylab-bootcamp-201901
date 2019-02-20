const uuid = require("uuid/v4");
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const file = __dirname + "/artist-comments.json"

const artistComment = {

    "file": file,

    read(fileToRead) {
        return readFile(fileToRead, { encoding: "utf-8" }).then(fileData =>
            JSON.parse(fileData)
        );
    },

    write(fileToWrite, dataToStringify) {
        const dataToSave = JSON.stringify(dataToStringify, null, 4);
        return writeFile(fileToWrite, dataToSave).then(() =>
            console.log("File saved!")
        );
    },

    add(comment) {
        comment.id = uuid();
        return this.read(file)
            .then(fileData => {
                fileData.push(comment);
                return fileData;
            })
            .then(fileData => this.write(file, fileData))
            .catch(error => {
                throw Error(error.message);
            });
    },

    retrieve(commentId) {
        return this.read(file)
            .then(fileData =>
                fileData.find(comment => comment.id === commentId)
            )
            .then(comment => {
                if (comment === undefined) {
                    throw Error(`Comment with ID "${commentId}" doesn't exist`);
                }
                return comment;
            })
            .catch(error => {
                throw Error(error.message);
            });
    },

    update(comment) {
        const { id } = comment;
        return this.read(file)
            .then(fileData => {
                const commentIndex = fileData.findIndex(
                    comment => comment.id === id
                );
                fileData[commentIndex] = comment;
                return fileData;
            })
            .then(fileData => this.write(file, fileData))
            .catch(error => {
                throw Error(error.message);
            });
    },

    delete(commentId) {
        return this.read(file)
            .then(fileData => {
                const commentIndex = fileData.findIndex(
                    comment => comment.id === commentId
                );
                if (commentIndex === -1) {
                    throw Error(`Comment with ID "${commentId}" doesn't exist`);
                }
                fileData.splice(commentIndex, 1);
                return fileData;
            })
            .then(fileData => this.write(file, fileData))
            .catch(error => {
                throw Error(error.message);
            });
    },

    find(criteria) {
        return this.read(file)
            .then(fileData => {
                let filteredComments = []
                for (const prop in criteria) {
                    filteredComments = filteredComments.concat(
                        fileData.filter(comment => comment[prop] === criteria[prop])
                    )
                    filteredComments = filteredComments.filter(comment => comment[prop] === criteria[prop])
                }
                filteredComments = [...new Set(filteredComments)]
                return filteredComments
            })
    }
};

module.exports = artistComment;
