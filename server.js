const express = require('express');
const http = require('http');
const {Server} = require('socket.io');


const app = express()
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname))

// app.get('/', (req, res) => {
//     res.sendFile(`${__dirname}/index.html`);
// })

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('chat message', (data) => {
        const {username, message} = data;
        console.log(username, 'connected');
        io.emit('chat message', { username, message });
    })

    socket.on('disconnect', () => {
        console.log(`user disconnected!`);
    })
})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/`);
})

