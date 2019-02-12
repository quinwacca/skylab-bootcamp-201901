const net = require('net')

const { argv: [ , , ip, port, nick, message]} = process

function chat(nick, message) {
    let socket = net.createConnection(port, ip);
    socket.write(`<${nick}> ${message}`);
    socket.on("data", data => console.log(data.toString()))
  }

chat(nick, message)

// var net = require('net');

// const { argv: [ , , ip, port, nick, message]} = process

// const conn = net.createConnection(port, ip)

// conn.write(`${nick}: ${message}`)

// conn.on('data', data => console.log(data.toString()))


