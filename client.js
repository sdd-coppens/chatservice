$(function () {
    var socket = io();
    var userName = window.prompt('Please enter your desired username:');
    var profilePicture = window.prompt('Please enter your desired profile picture:');

    $('form').submit(function (e) {
        e.preventDefault(); // prevents page reloading

        if ($('#m').val().trim() === '' || userName === null) {
            return false;
        } else {
            socket.emit('chat message', { profilePictureVar:profilePicture, userNameVar: userName, message: $('#m').val(), timestamp: Date.now() });
            $('#m').val('');
            return false;
        }
    });

    socket.on('chat message', function(msg) {
        messageList = $('messages');
        var messageTimestamp = new Date(msg.timestamp);
        if (msg.profilePictureVar === '') {
            msg.profilePictureVar = 'https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg';
        }
        var userProfilePicture = '<img width=\'50\' height=\'50\' src=\'' + msg.profilePictureVar + '\'/>';

        if (msg.message.endsWith('.png') || msg.message.endsWith('.jpg') || msg.message.endsWith('.jpeg') || msg.message.endsWith('.gif')) {
            $('#messages').append('<li data-timestamp='+messageTimestamp+'>' + userProfilePicture + msg.userNameVar + ': <img width=\'200\' height=\'200\' src=\'' + msg.message + '\'/></li>');
        } else {
            var timeReadable = messageTimestamp.getHours()+":"+messageTimestamp.getMinutes();
            var htmlElementTitle = "SentAt" + timeReadable;
            $('#messages').append('<li data-timestamp='+messageTimestamp+' title='+htmlElementTitle+' >'  + userProfilePicture + msg.userNameVar + ': ' + msg.message + '</li>');
        }
        var item = document.getElementById('messages').children.item(document.getElementById('messages').children.length - 1);
        item.addEventListener("mouseover", func, false);
        function func() {
            $(item).tooltip();
            console.log(item.attributes.item(4).name);
        }
    });
    window.scrollTo(0, document.body.scrollHeight + 20000000);
});