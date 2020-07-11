var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/chatPage.html")
});

app.get('/client.js', function (req, res) {
    res.sendFile(__dirname + '/client.js');
});

app.get('/client.css', function (req, res) {
    res.sendFile(__dirname + '/client.css');
});

io.on('connection', function(socket) {
    console.log('someone connected');
    io.emit('chat message', { profilePictureVar:'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/IMG_7148_620x.jpg', userNameVar: 'admin', message: 'someone connected, ' + io.engine.clientsCount + ' in the session.', timestamp: Date.now()});
    //https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3
    //
    socket.on('disconnect', function() {
        console.log('someone disconnected');
        io.emit('chat message', { profilePictureVar:'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/IMG_7148_620x.jpg', userNameVar: 'admin', message: 'someone disconnected, ' + io.engine.clientsCount + ' in the session.', timestamp: Date.now()});
    });
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        console.log(JSON.stringify(msg));
        io.emit('chat message', msg);
    });
});

http.listen(80, function () {
    console.log('listening on *:80');
});