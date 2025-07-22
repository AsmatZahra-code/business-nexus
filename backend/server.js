// // backend/server.js
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
// const requestRoutes = require('./routes/requestRoutes');
// const profileRoutes = require('./routes/profileRoutes');
// const path = require('path');
// dotenv.config();
// console.log("JWT_SECRET loaded:", process.env.JWT_SECRET); // TEMP debug
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// connectDB();

// // Sample route
// app.get('/', (req, res) => {
//   res.send('API running...');
// });
// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/requests', requestRoutes);
// app.use('/api/profile', profileRoutes);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/api/chat', require('./routes/chat'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http'); // ✅ Import http
const { Server } = require('socket.io'); // ✅ Import socket.io
const connectDB = require('./config/db');
const Message = require('./models/Message'); // ✅ adjust the path if your model is in a different folder
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const requestRoutes = require('./routes/requestRoutes');
const { getRoomId } = require('./utils/socketUtils'); 
const profileRoutes = require('./routes/profileRoutes');
const chatRoutes = require('./routes/chatRoutes'); // ✅ Assuming you have a chat route
const path = require('path');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // ✅ Create HTTP server using app
const io = new Server(server, {
  cors: {
    origin: "*", // ⚠️ Replace with frontend domain in production
    methods: ["GET", "POST"]
  }
});

// ✅ Socket.IO setup
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('joinRoom', ({ senderId, receiverId }) => {
    const roomId = getRoomId(senderId, receiverId); // ✅ use utility
    socket.join(roomId);
    console.log(`User ${senderId} joined room ${roomId}`);
  });

 socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
  const roomId = getRoomId(senderId, receiverId);
  
  // Save to DB
  const newMessage = new Message({ senderId, receiverId, message });
  await newMessage.save();

  io.to(roomId).emit('receiveMessage', {
    senderId,
    receiverId,
    message,
    timestamp: newMessage.timestamp,
  });
});

 socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Middleware
app.use(cors());
app.use(express.json());

// Rout
app.get('/', (req, res) => res.send('API running...'));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/chat', chatRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // ✅ Listen using server
