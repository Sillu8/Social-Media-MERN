const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors')
const morgan = require('morgan');
const colors = require('colors');
const socketIO = require('socket.io');
const port = process.env.PORT || 5000;


const connectDB = require('./config/db');
const {errorHandler} = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const postRoutes = require('./routes/postRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const messageRoutes = require('./routes/messageRoutes');


connectDB();
const io = socketIO(process.env.SOCKET_PORT);
const app = express();

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));




app.use('/api/v1/user',userRoutes);
app.use('/api/v1/admin',adminRoutes);
app.use('/api/v1/post',postRoutes);
app.use('/api/v1/conversation',conversationRoutes);
app.use('/api/v1/message',messageRoutes);




app.use(errorHandler);

app.listen(port,()=>console.log(`Server started on ${port}`.black.bgCyan));