const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const code = {
    value: {},
};

app.get('/', (req, res) => {
    res.send({ ok : true });
})

io.on('connection', socket => {
        
    socket.emit('newConnection');

    socket.on('change', newValue => {
        code.value = newValue;
        io.emit('codeChanged', code.value);
    })
})

server.listen(4000, () => {
    console.log('Servidor aberto na porta 4000');
})
