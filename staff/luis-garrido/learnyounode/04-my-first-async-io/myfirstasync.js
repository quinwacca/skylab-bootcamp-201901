let fs = require('fs')

module.exports = path => {
 
    return fs.readFile(path, response =>
        
        response.toString().split('\n').length-1 
    )
        
    
}

