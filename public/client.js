const socket = io()

let name;
let textarea = document.querySelector('#textarea')

let messageArea = document.querySelector('.message__area')

/* check condition for user name */
do {
    name = prompt('Please enter your name : ')
} while (!name)

/* get message and enter by user message */
textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

/* send message user name and message */
function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    /* Append message into textarea after write any msg */
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    /* function call to scroll */
    scrollToBottom()

    /* user socket for send the message on server */
    socket.emit('message', msg)
}

/* Append the message */
function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

/* Recieve All message from clients / incoming */
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')

    /* function call to scroll */
    scrollToBottom()
})

/**
 * function use for scroll automatic 
 * when send message then show the latest message 
 */
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}