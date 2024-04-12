const http = require("http");
const { Server } = require("socket.io");
const manager = require("./gameManager");
class Socket {
  constructor(app) {
    this.server = http.createServer(app);
    this.io = new Server(this.server, { cors: { origin: "*" } });
  }

  listen(port) {
    this.server.listen(port, () => {
      console.log(`listening on port: ${port}`);
      this.io.on("connection", (socket) => {
        this.connection(socket);
        socket.on("disconnect", () => this.disconnect(socket));
        socket.on("create room", (callback) =>
          this.createRoom(socket, callback)
        );
        socket.on("join room", (roomId, callback) =>
          this.joinRoom(socket, roomId, callback)
        );
        socket.on("room", (room) => this.handleRoom(socket, room));
      });
    });
  }

  connection(socket) {
    this.addPlayer(socket);
    console.log("a user connected");
  }
  disconnect(socket) {
    manager.removePlayer(socket.id);
    console.log("a user disconnected");
  }
  addPlayer(socket) {
    manager.addPlayer({ id: socket.id });
  }
  createRoom(socket, callback) {
    const room = manager.createRoom(socket.id);
    callback(room);
  }
  joinRoom(socket, roomId, callback) {
    manager.joinRoom(socket.id, roomId);
    const player = manager.findPlayerById(socket.id);
    callback(player);
  }
  handleRoom(socket, room) {
    const { roomId, board, dice, collects, hits, turn } = room;
    const updatedRoom = manager.findAndUpdateRoom(roomId, {
      board,
      dice,
      collects,
      hits,
      turn,
    });
    socket.broadcast.emit(roomId, updatedRoom);
    return updatedRoom;
  }
}

module.exports = Socket;
