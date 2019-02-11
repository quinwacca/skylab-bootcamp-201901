
var mymodule = require('./mymodule.js')

mymodule(process.argv[2], process.argv[3], (error, result) => {
    console.log
    for (let i = 0; i<result.length; i++) console.log(result[i])
})