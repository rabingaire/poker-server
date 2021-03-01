import { getUserAndSingleBotCard } from './gameserver/kitty/utils';

let users = [];
let gameStarted = false;

const MAX_PLAYERS = 4;
const MAX_TIME = 3; // IN SECONDS

const EVENT_PLAYER_NUMBER_CHANGE = 'EVENT_ADD_PLAYER';
const EVENT_TIME_CHANGE = 'EVENT_TIME_CHANGE';
const EVENT_GAME_START = 'EVENT_GAME_START';
const EVENT_CARDS_DEALT = 'EVENT_CARDS_DEALT';

/**
 * Socket object.
 *
 * @param {Object} socket
 * @param {Object} io
 */
function gameSocket(socket, io) {
  log('game socket: New user connected');

  if (users.length > MAX_PLAYERS) {
    throw 'Max 4 players allowed';
  }
  const user = {
    name: `Player ${users.length + 1}`,
    id: socket.id,
  };

  if (!users.includes(user)) {
    users.push(user);
    if (!gameStarted) {
      startGameWaitingTimer(io);
    }
    io.emit(EVENT_PLAYER_NUMBER_CHANGE, { total_no_of_players: users.length, players: users });
  }

  socket.on('disconnect', () => {
    users = users.filter((listUser) => listUser !== user);
    io.emit(EVENT_PLAYER_NUMBER_CHANGE, { total_no_of_players: users.length, players: users });
  });

  socket.on('chat message', (msg) => {
    log(`new msg ${msg}`);
    io.emit('chat message', msg);
  });
}

function startGameWaitingTimer(io) {
  log('game interval started');
  let gameTime = MAX_TIME;
  const INTERVAL_DELTA = 1000;
  let intervalId = setInterval(() => {
    io.emit(EVENT_TIME_CHANGE, { time: gameTime, total_no_of_players: users.length });
    gameTime = gameTime - 1;
    if (gameTime <= 0) {
      clearInterval(intervalId);
      startGame(io);
    }
  }, INTERVAL_DELTA);
}

function startGame(io) {
  io.emit(EVENT_GAME_START, { message: 'Game Started' });
  // fetch the game cards for a player
  const gameData = getUserAndSingleBotCard();
  io.emit(EVENT_CARDS_DEALT, gameData);
}

/**
 * Log string.
 *
 * @param {String} msg
 */
function log(msg) {
  console.log(msg);
}

export default gameSocket;
