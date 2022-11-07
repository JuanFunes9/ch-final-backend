const Message = require('../models/Mesagge.model')

const addMessage = async (newMessage) => {
    const msg = new Message(newMessage);
    msg.date = new Date().toLocaleString();

    await msg.save();
}

const getMessages = async () => {
    const messages = await Message.find()
        .populate('user', { firstName: 1, lastName: 1, image: 1 });
    messages.splice(0, messages.length - 10)

    return messages;
}

const socketController = async (socket) => {

    const messages = await getMessages();
    socket.emit('messages', messages);

    socket.on('newMessage', async (newMessage) => {
        await addMessage(newMessage);
        const messages = await getMessages();

        socket.broadcast.emit('messages', messages);
        socket.emit('messages', messages);
    })
}

module.exports = socketController;