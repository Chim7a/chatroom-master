// DOM queries
const chatList = document.querySelector('.chat-list')
const newChatForm = document.querySelector('.new-chat')
const newNameForm = document.querySelector('.new-name')
const updateMsg = document.querySelector('.update-mssg')
const rooms = document.querySelector('.chat-rooms')

// Add new chat
newChatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => err)
})

//Update Username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    // Update name via the chatroom
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    // Reset Form
    newNameForm.reset();
    // Show and then hide update message
    updateMsg.innerText = `Your name was updated to ${newName}`;
    setTimeout(() => updateMsg.innerText = '', 3000);
})

// Update chat room
rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear()
        chatroom.updateRoom(e.target.getAttribute('id'))
        chatroom.getChat(chat => chatUI.render(chat))
    }
})

// Check local storage for a name
const username = localStorage.username ? localStorage.username : "anon";


// Class Instances
const chatUI = new ChatUI(chatList)
const chatroom = new Chatroom ('gaming', username);


// Get chat and render to DOM
chatroom.getChat(data => chatUI.render(data))