$(document).ready(function() {
    $("#rooms").append('<button onclick="joinRoom(1)" id="room1">Room 1</button> <br/>');
    $("#rooms").append('<button onclick="joinRoom(2)" id="room2">Room 2</button> <br/>');
    $("#rooms").append('<button onclick="joinRoom(3)" id="room3">Room 3</button> <br/>');
});

function joinRoom(roomId) {
    console.log(roomId);
    document.location.href = "/chatPage.html?roomId="+roomId;
}

