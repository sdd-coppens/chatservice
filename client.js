$(function () {
    var url = new URL(window.location.href);
    var roomId = new URLSearchParams(url.search).get("roomId");
    var socket = io("http://localhost?roomId="+roomId);
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
        var timeReadable = messageTimestamp.getHours()+":"+messageTimestamp.getMinutes();
        var htmlElementTitle = "Sent&nbsp;at&nbsp;" + timeReadable;

        if (msg.message.endsWith('.png') || msg.message.endsWith('.jpg') || msg.message.endsWith('.jpeg') || msg.message.endsWith('.gif')) {
            $('#messages').append('<li data-timestamp='+messageTimestamp+' title='+htmlElementTitle+'>' + userProfilePicture + msg.userNameVar + ': <img width=\'200\' height=\'200\' src=\'' + msg.message + '\'/></li>');
        } else if (msg.message.endsWith('.mp3') || msg.message.endsWith('.ogg') || msg.message.endsWith('.wav')) {
            $('#messages').append('<li data-timestamp='+messageTimestamp+' title='+htmlElementTitle+'>' + userProfilePicture + msg.userNameVar + ': <audio controls> <source src=\'' + msg.message + '\' type="audio/mpeg"></audio></li>');
        } else if (msg.message.endsWith('.mp4') || msg.message.endsWith('.ogg') || msg.message.endsWith('.webm')) {
            $('#messages').append('<li data-timestamp='+messageTimestamp+' title='+htmlElementTitle+'>' + userProfilePicture + msg.userNameVar + ': <video width="320" height="240" controls> <source src=\'' + msg.message + '\' type="audio/mp4"></video></li>');
        } else {
            $('#messages').append('<li data-timestamp='+messageTimestamp+' title='+htmlElementTitle+' >'  + userProfilePicture + msg.userNameVar + ': ' + msg.message + '</li>');
        }
        var item = document.getElementById('messages').children.item(document.getElementById('messages').children.length - 1);
        item.addEventListener("mouseover", func, false);
        function func() {
            $(item).tooltip="";
        }
        window.scrollTo(0, document.body.scrollHeight + 2000000);
    });


    // let dropArea = $('#m');
    // dropArea.addEventListener('dragenter', handlerFunction, false)
    // dropArea.addEventListener('dragleave', handlerFunction, false)
    // dropArea.addEventListener('drop', handlerFunction, false)
    //
    // function handlerFunction
});