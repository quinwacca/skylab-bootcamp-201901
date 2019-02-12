let fs = require('fs')

module.exports = function aSync(path, extension, callback) {
    fs.readdir(path, function done(error,list) {
        if (error) return callback(error)
        let result = list.filter(file => file.includes('.'+extension))
        return callback(null, result)    
    })
}