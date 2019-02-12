let fs = require('fs')

function aSync() {
    fs.readFile(process.argv[2], function done(error,file) {
        console.log(file.toString().split('\n').length-1)
    })
}

aSync()
