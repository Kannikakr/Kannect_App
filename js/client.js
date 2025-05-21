// JS file 
const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageinput = document.getElementById('messageInp')
const messagecontainer = document.querySelector(".container")

var audio = new Audio('../ting.mp3');

const append = (message, position)=>{
    const messageele = document.createElement('div');
    messageele.innerText = message;
    messageele.classList.add('message');
    messageele.classList.add(position);
    messagecontainer.append(messageele);
    messagecontainer.scrollTop = messagecontainer.scrollHeight;
    if(position == 'left'){
        console.log('sound is playing');
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault(); // prevent page reloading
    const message = messageinput.value;
    append(`you : ${message}`,'right');
    socket.emit('send', message);
    messageinput.value = '';
})
  
//const name = prompt("Enter your name to join");
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name)

socket.on('user-joined', name => {
    append(`${name} joined the chat`,'right');
})

socket.on('receive', data=>{
    append(`${data.name} : ${data.message} `,'left');
})

socket.on('left', name=>{
    append(`${name} left the chat`,'left');
})
