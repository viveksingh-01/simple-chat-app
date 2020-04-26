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
io.on('connection', () => {
  console.log('New user connected');
});
