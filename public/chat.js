$(function () {
  const socket = io.connect('http://localhost:5000');

  const username = $('#username');
  const changeUsername = $('#btn-change-username');
  const chatWindow = $('chat-window');
  const message = $('message');
  const sendMessage = $('btn-send-message');

  changeUsername.click(() => {
    if (username.val()) {
      socket.emit('change_username', { username: username.val() });
    }
  });
});
