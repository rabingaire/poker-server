import './env';
import './db';

import express from 'express';
import * as Sentry from '@sentry/node';

import routes from './routes';
import SocketIO from 'socket.io';
import http from 'http';

// Initialize Sentry
// https://docs.sentry.io/platforms/node/express/
Sentry.init({ dsn: process.env.SENTRY_DSN });

const app = express();

const APP_PORT =
  (process.env.NODE_ENV === 'test' ? process.env.TEST_APP_PORT : process.env.APP_PORT) || process.env.PORT || '3000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';


app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

const server = http.Server(app);

const io = SocketIO(server);

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(APP_PORT, () => {
  console.log('listening on *:' + APP_PORT);
});

export default app;
