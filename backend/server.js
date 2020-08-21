const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.send({ ok : true });
})

io.on('connection', socket => {
    console.log(`Conexão aberta com id: ${socket.id}`);
})

server.listen(4000, () => {
    console.log('Servidor aberto na porta 4000');
})
