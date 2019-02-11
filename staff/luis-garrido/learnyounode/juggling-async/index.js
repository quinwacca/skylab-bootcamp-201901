let bl = require('bl')
let http = require('http')

http.get(process.argv[2], response => {
    response.pipe(bl((err, data) => {
        console.log(data.toString())
    }))
    response.on("end", data => http.get(process.argv[3], response => {
        response.pipe(bl((err, data) => {
            console.log(data.toString())
        }))
    }))
    response.on("end", data => http.get(process.argv[4], response => {
        response.pipe(bl((err, data) => {
            console.log(data.toString())
        }))
    }) )
})