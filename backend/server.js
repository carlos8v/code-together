const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const code = {
    text: ''
};

app.get('/', (req, res) => {
    res.send({ ok : true });
})

io.on('connection', socket => {
        
    socket.emit('newConection', code);

    socket.on('codeChanged', newCodeText => {
        code.text = newCodeText;
        io.emit('codeChanged', code);
    })
})

server.listen(4000, () => {
    console.log('Servidor aberto na porta 4000');
})
