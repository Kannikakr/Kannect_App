
# Kannect_App 💬

**Kannect_App** is a real-time chat application built with **Node.js** and **Socket.IO**, enabling instant messaging between users in a chat room environment.

---

## 🚀 Features

- Real-time chat with instant message delivery
- Join and leave notifications for users
- Smooth UI with message alignment (left/right)
- Sound alert on incoming messages
- Built-in broadcast system using `socket.broadcast.emit()`

---

## 🛠️ Technologies Used

- Node.js
- Socket.IO
- HTML, CSS, JavaScript
- Audio playback for message alerts

---

## 📁 Project Structure

```
Kannect_App/
│
├── index.html               # Frontend chat interface
├── style.css                # Styling for the UI
├── script.js                # Client-side socket logic
├── server.js                # Node.js + Socket.IO server
├── ting.mp3                 # Notification sound
├── .gitignore               # Ignoring node_modules and other files
├── package.json             # Node dependencies and scripts
```

---

## 🚧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Kannikakr/Kannect_App.git
cd Kannect_App
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Server

```bash
node server.js
```

> ⚠️ Make sure port **8000** is free. The server runs on `http://localhost:8000`.

---

## 🌐 Open the App

Simply open `index.html` in your browser.

Each tab/window acts like a new user.

---

## 🗂️ Sample .gitignore (for Node.js)

```bash
node_modules/
.env
.DS_Store. I have used node_modules/. 
```

---

## 📝 How It Works

- When a user joins, their name is prompted and shared with others using `socket.broadcast.emit('user-joined')`.
- Messages are sent with `socket.emit('send')` and received by others with `socket.broadcast.emit('receive')`.
- When a user disconnects, `socket.broadcast.emit('left')` informs others.

---

## 📸 Screenshots

 *(To be added soon)*

---


Feel free to contribute, fork, or ⭐ this repo!
