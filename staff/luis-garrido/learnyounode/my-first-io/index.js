let fs = require('fs')

let prueba = fs.readFileSync(process.argv[2])

console.log(prueba.toString().split('\n').length-1)

