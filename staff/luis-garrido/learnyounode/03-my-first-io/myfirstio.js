let fs = require('fs')

module.exports = path => {
    let prueba = fs.readFileSync(path)
    return prueba.toString().split('\n').length-1
}

