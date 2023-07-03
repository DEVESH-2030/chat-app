
const express = require('express');

const socket = require('socket.io');

const app = express()

const http = require('http').createServer(app)

const PORT = process.env.PORT || 7000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

/**
 *  use express middleware
 * to call file automatic  
 */
app.use(express.static(__dirname + '/public'))

/* create route */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

/**
 *  Import and setup of secket.io
 *
 */
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')

    /* get  message on server */
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})