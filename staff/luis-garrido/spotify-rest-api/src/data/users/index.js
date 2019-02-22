'use strict'


const { ObjectId } = require('mongodb')

const user = {
    collection: null,

    add(user) {
        if (!(user instanceof Object)) throw TypeError (`${user} is not an object`)
        if (Object.keys(user).length === 0 ) throw Error (`object cannot be empty`)
        
        return this.collection.insertOne(user)
            .then(res => res.insertedId.toString())
    },

    findByEmail(emailToBeFinded) {
        if (typeof emailToBeFinded !== 'string') throw TypeError(emailToBeFinded + ' is not a string')
        if (!emailToBeFinded.trim().length) throw Error('email cannot be empty')

        return this.collection.findOne({ email: emailToBeFinded })
    },

    findById(idToBeFinded) {
        // TODO validate

        return this.collection.findOne({ _id: ObjectId(idToBeFinded) }) 
    },

    update(userId, propToUpdate) {
        //TODO validate

        return this.collection.findOneAndUpdate( { _id: ObjectId(userId) }, { $set: propToUpdate })
    },

    delete(userIdToBeDeleted) {
        if (typeof userIdToBeDeleted !== 'string') throw TypeError(userIdToBeDeleted + ' is not a string')
        if (!userIdToBeDeleted.trim().length) throw Error('ID cannot be empty')

        return this.collection.deleteOne( { _id : ObjectId(userIdToBeDeleted) } )
    }
    // updateFavoriteArtists(userId, ToUpdate) {
    //     // TODO validate

    //     return this.collection.findOneAndUpdate({ _id: ObjectId(userId.toString())}, { $set: propToUpdate })
    // }
    // cars.findOneAndUpdate({ brand: 'Nissan', model: 'Micra', year: 2005 }, { $set: { year: 2002 } })
        //     .then(console.log)
}

module.exports = user