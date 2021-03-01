const users = [];
const sockets = {};

/**
 * Socket object.
 *
 * @param {Object} socket
 * @param {Object} io
 */
function gameSocket(socket, io) {
  console.log('game socket: New user connected');
  socket.on('chat message', (msg) => {
    console.log('new msg', msg);
    io.emit('chat message', msg);
  });
}

export default gameSocket;
