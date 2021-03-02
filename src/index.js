import './env';
import './db';

import express from 'express';
import SocketIO from 'socket.io';
import http from 'http';
import gameSocket from './gameSocket';
import gameRoom from './gameRooms/gameRoom';

const app = express();

const APP_PORT =
  (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || process.env.PORT || '3000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';

app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

const server = http.Server(app);

const io = SocketIO(server, { path: '/rooms' });

// io.on('connection', (socket) => gameSocket(socket, io));
io.on('connection', (socket) => gameRoom(socket, io));

// app.get('/', (req, res) => {
//   console.log('requesting web page');
//   res.sendFile(__dirname + '/index.html');
// });

app.get('/rooms', (req, res) => {
  console.log('requesting web page');
  res.sendFile(__dirname + '/gameRooms/index.html');
});

server.listen(APP_PORT, () => {
  console.log(`listening on ${APP_HOST}:${APP_PORT}`);
});

export default app;
