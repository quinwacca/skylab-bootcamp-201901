let fs = require('fs')

function aSync() {
    fs.readdir(process.argv[2], function done(error,list) {
        if (error) console.error(error.message)
        let result = list.filter(file => file.includes('.'+process.argv[3]))
        for (let i = 0; i<result.length; i++) console.log(result[i])
    })
}

aSync()
