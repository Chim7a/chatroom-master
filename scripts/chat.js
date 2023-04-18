// adding new chat documents
// setting up a realtime listener to get new chats
// updating the username
// updating the room

class Chatroom {
    constructor (room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }

    // Method to add a new chat
    async addChat (message) {
        // format chat object.
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };

        // Save the chat document
        const response = await this.chats.add(chat);
        return response;
    }

    getChat(callback) {
        // this.chat is being looped through in the above constructor
        // snapshot.docChanges() holds the current changes.
        // change.doc.data() is the current data
        this.unsub = this.chats
        // COMPLEX Queries. The where() method is used to check the collections for true conditions(in this case, the Chat collection in firebase)
        // It takes in 3 arguements. 1st param is the property name we want to access
        // 2nd is the condition (Firestore only uses double eqauls)
        // 3rd arg being the where the property is stored in the constructor
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added'){
                    callback(change.doc.data())
                }
            });
        });
    }

    updateName(username){
        this.username = username;
        // Store username in local storage
        localStorage.setItem('username', username);
    }
    updateRoom(room){
        this.room = room;
        if (this.unsub) {
            this.unsub();
        }
    }
}
