const net = require('net')


const { argv: [, , port] } = process

let server = net.createServer(socket => {
    // console.log('connected\n')
    socket.on('data', data => {
        console.log(data.toString())
        socket.end('disconnected')
    })

})

server.listen(port)

