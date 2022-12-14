const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors')
const morgan = require('morgan');
const colors = require('colors');
// const socketIO = require('socket.io');
const port = process.env.PORT || 5000;


const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const postRoutes = require('./routes/postRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

connectDB();

app.options('*', cors())

app.use(cors())

// {
//     origin: ["https://www.chat.ecart.ltd", "https://chat.ecart.ltd","http://localhost:3000"],  //'https://www.chat.ecart.ltd'
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Access']
// }

const { createServer } = require('http')
const httpServer = createServer(app);
const { Server } = require('socket.io');

const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000", "https://www.chat.ecart.ltd", "https://chat.ecart.ltd"],
    },
});

let users = [];
const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
        users.push({ userId, socketId });
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = (id) => {
    return users.find(user => user.userId === id)
}

//On connections
io.on('connection', socket => {
    console.log('User connected');
    //Take userId and socketId from user;
    socket.on('addUser', userId => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    })

    //Send and get message
    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        if (user) {
            io.to(user.socketId).emit('getMessage', {
                senderId,
                text
            });
        }
    });


    //On disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    })
})

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/conversation', conversationRoutes);
app.use('/api/v1/message', messageRoutes);




app.use(errorHandler);

httpServer.listen(port, () => console.log(`Server started on ${port}`.black.bgCyan));