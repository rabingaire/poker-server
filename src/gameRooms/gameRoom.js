import { getUserAndSingleBotCard } from '../gameserver/kitty/utils';

const USERS_PER_ROOM = 3;

// ALL TIME ARE IN SECONDS
const MULTI_PLAYER_USER_WAIT_TIME = 5;
const USER_CARD_PREPARATION_TIME = 15;
const NEXT_SET_TIME = 10; // THIS TIME IS FOR USERS TO LOOK AT THEIR HAND AND WINNING HAND

const NAMESPACES = '/'; // this is the default namespace

const SERVER_EVENTS = {
  NEW_USER_ADD: 'NEW_USER_ADD',
  USER_DISCONNECTED: 'USER_DISCONNECTED',
  GAME_ALREADY_STARTED: 'GAME_ALREADY_STARTED',
  GAME_TIMER_START: 'GAME_TIMER_START',
  GAME_TIMER_END: 'GAME_TIMER_END',
  CARD_DISTRIBUTION: 'CARD_DISTRIBUTION',
  CARD_PREPARATION_STARTED: 'CARD_PREPARATION_STARTED',
  CARD_PREPARATION_ENDED: 'CARD_PREPARATION_ENDED',
  FIRST_MOVE: 'FIRST_MOVE',
  FIRST_MOVE_WINNER: 'FIRST_MOVE_WINNER',
  SECOND_MOVE: 'SECOND_MOVE',
  SECOND_MOVE_WINNER: 'SECOND_MOVE_WINNER',
  THIRD_MOVE: 'THIRD_MOVE',
  THIRD_MOVE_WINNER: 'THIRD_MOVE_WINNER',
  GAME_ENDED: 'GAME_ENDED',
  GAME_WON_AS_ALL_USER_LEFT: 'GAME_WON_AS_ALL_USER_LEFT',
  GAME_LOST_DUE_TO_IMPROPER_HAND: 'GAME_LOST_DUE_TO_IMPROPER_HAND',
};

const CLIENT_EVENTS = {
  LEAVE_ROOM: 'LEAVE_ROOM',
  USER_READY: 'USER_READY', // users might not need full time to prepare their hand
};

// todo handle socket.io errors using following on the client side
const SOCKET_IO_ERROR_EVENTS = {
  connect_error: '',
  reconnect_error: '',
  error: '',
  reconnect_failed: '',
};

let players = [];
const rooms = new Map();
const emptyRoomState = { gameStarted: false, users: [] };

function getRoomWithAvailableSeats() {
  // handles first user to the platform case
  // this condition might not be necessary
  if (rooms.size === 0) {
    const roomName = `room-${rooms.size}`;
    rooms.set(roomName, emptyRoomState);
    return roomName;
  }
  // scan for room with available space
  for (let [key, value] of rooms) {
    if (value.users.length < USERS_PER_ROOM) {
      return key;
    }
  }
  // handle room map is full so new room needs creation state
  const roomName = `room-${rooms.size}`;
  rooms.set(roomName, emptyRoomState);
  return roomName;
}

function addUserToRoom(roomName, user) {
  const roomData = rooms.get(roomName);
  const newUsers = [...roomData.users, user];
  const roomState = { ...roomData, ...{ users: newUsers } };
  rooms.set(roomName, roomState);
}

function removePlayerFromRoom(roomName, user) {
  const roomData = rooms.get(roomName);
  const users = [...roomData.users, user];
  const removedUsers = users.filter((cp) => cp !== user);
  const roomState = { ...roomData, ...{ users: removedUsers } };
  rooms.set(roomName, roomState);
  console.log('rooms', rooms);
}

function gameRoom(socket, io) {
  // new user management
  const roomName = getRoomWithAvailableSeats();
  const user = { name: `Player ${socket.id}`, id: socket.id, roomName: roomName };
  players.push(user);
  socket.user = user;
  socket.roomName = roomName;
  socket.join(roomName);
  addUserToRoom(roomName, user);
  fireNewUserAddedEvent(roomName, user, io);

  socket.on('disconnect', () => {
    // remove user management
    const user = socket.user;
    players = players.filter((cp) => cp !== user);
    removePlayerFromRoom(socket.roomName, socket.user);
    console.log('disconnect', socket.user);
  });
}

function fireNewUserAddedEvent(roomName, user, io) {
  io.sockets.in(roomName).emit(SERVER_EVENTS.NEW_USER_ADD, user);
}

function startGameLoop(roomName, io) {
  console.log('game interval started');
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

export default gameRoom;
