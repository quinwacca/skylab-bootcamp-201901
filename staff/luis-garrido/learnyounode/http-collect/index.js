let bl = require('bl')
let http = require('http')

let result = 0

http.get(process.argv[2], response => {
    response.on("data", data => result += data.toString().length)
    response.on("end", data => console.log(result))
    response.pipe(bl((err, data) => {
        console.log(data.toString())
    }))
    
    
}
    
)

