$(function () {
  const socket = io.connect('http://localhost:5000');

  const username = $('#username');
  const changeUsername = $('#btn-change-username');
  const chatWindow = $('#chat-window');
  const message = $('#message');
  const sendMessage = $('#btn-send-message');
  const feedback = $('#feedback');

  changeUsername.click(() => {
    if (username.val()) {
      socket.emit('change_username', { username: username.val() });
      message.val('');
    }
  });

  // Emit the message
  sendMessage.click(() => {
    if (message.val()) {
      socket.emit('new_message', { message: message.val() });
      message.val('');
    }
  });

  // Enables sending of message on press of ENTER key
  message.keypress((event) => {
    if (event.keyCode === 13 && message.val()) {
      socket.emit('new_message', { message: message.val() });
      message.val('');
    }
  });

  // Listens to 'new_message' and appends the message to the chat-window
  socket.on('new_message', (data) => {
    chatWindow.append(
      `<p class="messages"><span class="font-weight-bold">${data.username}</span>: ${data.message}</p>`
    );
  });

  // Gets triggered when the user starts typing
  message.bind('keydown', (event) => {
    if (event.keyCode !== 13) {
      socket.emit('start_feedback');
    }
  });

  // Display the user who is currently typing the message
  socket.on('start_feedback', (data) => {
    feedback.html(`<i>${data.username} is typing...</i>`);
  });

  // Gets triggered once the user stops typing
  message.bind('keyup', () => {
    socket.emit('end_feedback');
  });

  // Stop showing feedback message
  socket.on('end_feedback', () => {
    setTimeout(() => {
      feedback.html('&nbsp;');
    }, 2000);
  });
});
