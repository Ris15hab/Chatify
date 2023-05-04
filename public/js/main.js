const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

//get username and room from url
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

//join chatroom
socket.emit('joinRoom', { username, room });

//get room users
socket.on('roomUsers',({room,users})=>{
    outputRoomName(room);
    outputUsers(users);
})


socket.on('message', message => {
    //console.log(message);
    outputMessage(message);

    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

//message submit 
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // const msg=e.target.msg.value;
    // console.log(e.target.msg.value);

    //get msg text from form
    const msg = e.target.elements.msg.value;

    //emit massage to server
    socket.emit('chatMessage', msg);

    //clearing input field afetr emit
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();//still keeps pointer in text box.
})

//output message to DOM
const outputMessage = (message) => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username}<span  style="float: right">${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

const outputRoomName = (room) => {
    document.getElementById('room-name').innerHTML=`${room}`;
}

const outputUsers = (users) => {
    const userList=document.getElementById('users');
    userList.innerHTML= `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}