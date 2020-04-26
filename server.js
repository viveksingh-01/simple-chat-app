const express = require('express');
const app = express();

// Set template-engine
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// Create HTTP server
const port = 5000;
const server = app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

// Render index.ejs
app.get('/', (req, res) => {
  res.render('index');
});

// Socket.io instantiation
const io = require('socket.io')(server);

// Listen on every connection
io.on('connection', (socket) => {
  console.log('New user connected');

  // Set default username
  socket.username = 'Anonymous';

  // Listen on 'change_username' and set usernamme
  socket.on('change_username', (data) => {
    socket.username = data.username;
  });

  // Listen on 'send_message and emit message to all the users including the sender
  socket.on('new_message', (data) => {
    io.sockets.emit('new_message', {
      message: data.message,
      username: socket.username
    });
  });

  // Listen on 'start_feedback' and broadcast to all users except the send
  socket.on('start_feedback', () => {
    socket.broadcast.emit('start_feedback', { username: socket.username });
  });

  socket.on('end_feedback', () => {
    socket.broadcast.emit('end_feedback');
  });
});
