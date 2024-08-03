const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/user');
const { authenticateToken } = require('./middleware/authenticateToken');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Registration Route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).send('User registered');
});

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await user.comparePassword(password)) {
        const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken });
    } else {
        res.status(400).send('Invalid credentials');
    }
});

// Socket.io Connection
io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('upload', (data) => {
        const { filename, fileData, recipient } = data;
        const filePath = path.join(__dirname, 'uploads', filename);
        fs.writeFile(filePath, fileData, 'base64', (err) => {
            if (err) {
                socket.emit('uploadStatus', { status: 'error', message: 'Upload failed' });
                return;
            }
            io.to(recipient).emit('fileReceived', { filename, filePath });
            socket.emit('uploadStatus', { status: 'success', message: 'Upload successful' });
        });
    });

    socket.on('join', (userId) => {
        socket.join(userId);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Handle React routing, return React's index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start server
server.listen(process.env.PORT || 3001, () => {
    console.log('Server is running');
});
