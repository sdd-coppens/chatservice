var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
let rooms = [[],[],[]];

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/start.html")
});

app.get('/start.js', function (req, res) {
    res.sendFile(__dirname + '/start.js');
});

app.get('/chatPage.html', function (req, res) {
    res.sendFile(__dirname + '/chatPage.html');
});

app.get('/client.css', function (req, res) {
    res.sendFile(__dirname + '/client.css');
});

app.get('/client.js', function (req, res) {
    res.sendFile(__dirname + '/client.js');
});



io.on('connection', function(socket) {
    console.log('someone connected');
    var roomId = new URLSearchParams(socket.handshake.url.replace("/socket.io/?","")).get("roomId");
    console.log("roomId:"+roomId);
    rooms[roomId-1].push(socket.id);
    //io.clients[rooms[roomId-1]].send('chat message', { profilePictureVar:'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/IMG_7148_620x.jpg', userNameVar: 'admin', message: 'someone connected, ' + io.engine.clientsCount + ' in the session.', timestamp: Date.now()});
    for (var i = 0; i < rooms[roomId-1].length; i++) {
        var temp2 = roomId-1;
        var temp = rooms[roomId-1][i];
        io.to(rooms[roomId-1][i]).emit('chat message', { profilePictureVar:'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/IMG_7148_620x.jpg', userNameVar: 'admin', message: 'someone connected, ' + rooms[roomId-1].length + ' in the session.', timestamp: Date.now()});
    }
    //io.emit('chat message', { profilePictureVar:'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/IMG_7148_620x.jpg', userNameVar: 'admin', message: 'someone connected, ' + io.engine.clientsCount + ' in the session.', timestamp: Date.now()});
    console.log(socket.id);
    //https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3
    //
    socket.on('disconnect', function() {
        console.log(socket.id);
        console.log('someone disconnected');
        var roomId = new URLSearchParams(socket.handshake.url.replace("/socket.io/?","")).get("roomId");
        //const index = rooms.indexOf(roomId-1);
        const realIndex = rooms[roomId-1].indexOf(socket.id);
        if (realIndex > -1) {
            rooms[roomId-1].splice(realIndex, 1);
        }
        for (var i = 0; i < rooms[roomId-1].length; i++) {
            io.to(rooms[roomId-1][i]).emit('chat message', { profilePictureVar:'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/IMG_7148_620x.jpg', userNameVar: 'admin', message: 'someone disconnected, ' + io.engine.clientsCount + ' in the session.', timestamp: Date.now()});
        }

    });
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        var roomId = new URLSearchParams(socket.handshake.url.replace("/socket.io/?","")).get("roomId");
        for (var i = 0; i < rooms[roomId-1].length; i++) {
            console.log(JSON.stringify(msg));
            io.to(rooms[roomId-1][i]).emit('chat message', msg);
        }
    });
});

http.listen(80, function () {
    console.log('listening on *:80');
});

// var app = require('express')();
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);
//
// app.get('/', function(req, res) {
//     res.sendFile(__dirname + "/chatPage.html")
// });
//
// app.get('/client.js', function (req, res) {
//     res.sendFile(__dirname + '/client.js');
// });
//
// app.get('/client.css', function (req, res) {
//     res.sendFile(__dirname + '/client.css');
// });
//
// io.on('connection', function(socket) {
//     console.log('someone connected');
//     console.log(socket.id);
//     io.emit('chat message', { profilePictureVar:'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/IMG_7148_620x.jpg', userNameVar: 'admin', message: 'someone connected, ' + io.engine.clientsCount + ' in the session.', timestamp: Date.now()});
//     //https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3
//     //
//     socket.on('disconnect', function() {
//         console.log('someone disconnected');
//         console.log(socket.id);
//         io.emit('chat message', { profilePictureVar:'https://cdn.shopify.com/s/files/1/0058/4538/5314/products/IMG_7148_620x.jpg', userNameVar: 'admin', message: 'someone disconnected, ' + io.engine.clientsCount + ' in the session.', timestamp: Date.now()});
//     });
// });
//
// io.on('connection', function (socket) {
//     socket.on('chat message', function (msg) {
//         console.log(JSON.stringify(msg));
//         io.emit('chat message', msg);
//     });
// });
//
// http.listen(80, function () {
//     console.log('listening on *:80');
// });