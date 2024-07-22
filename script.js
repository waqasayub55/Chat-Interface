document.addEventListener("DOMContentLoaded", function() {
  const listUsers = document.querySelectorAll(".user");
  const chats = document.querySelectorAll(".chat-container");
  listUsers.forEach((user, index) => {
    user.addEventListener("click", () => {
      chats.forEach(chat => {
        chat.style.display = "none";
      });
      chats[index].style.display = "block";
    });
  });
});


const closeButton = document.querySelector('.close-button');
const chatContent = document.querySelector('.chat-container');
closeButton.addEventListener('click', () => {
  chatContent.style.display = 'none';
});

// chat Input

const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

const messages = JSON.parse(localStorage.getItem('messages')) || []

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'user' ? 'user-bubble' : 'sender'}">
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message)
  })
}

let messageSender = 'user'

const updateMessageSender = (name) => {
  messageSender = name
  chatHeader.innerText = `${messageSender} chatting...`
  chatInput.placeholder = `Type here...`

  chatInput.focus()
}

const sendMessage = (e) => {
  e.preventDefault()

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  }
  messages.push(message)
  localStorage.setItem('messages', JSON.stringify(messages))

  chatMessages.innerHTML += createChatMessageElement(message)

  chatInputForm.reset()

  chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
  localStorage.clear()
  chatMessages.innerHTML = ''
})


