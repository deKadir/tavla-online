const ShortUniqueId = require("short-unique-id");
const initialBoard = [
  {
    index: 0,
    direction: "up",
    highlight: false,
    checkers: [
      {
        id: 1,
        color: "black",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 2,
        color: "black",
        hasMove: false,
        isSelected: false,
      },
    ],
  },
  {
    index: 1,
    direction: "up",
    highlight: false,
    checkers: [],
  },
  {
    index: 2,
    direction: "up",
    highlight: false,
    checkers: [],
  },
  {
    index: 3,
    direction: "up",
    highlight: false,
    checkers: [],
  },
  {
    index: 4,
    direction: "up",
    highlight: false,
    checkers: [],
  },
  {
    index: 5,
    direction: "up",
    highlight: false,
    checkers: [
      {
        id: 3,
        color: "white",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 4,
        color: "white",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 5,
        color: "white",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 6,
        color: "white",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 7,
        color: "white",
        hasMove: false,
        isSelected: false,
      },
    ],
  },
  {
    index: 6,
    direction: "up",
    highlight: false,
    checkers: [],
  },
  {
    index: 7,
    direction: "up",
    highlight: false,
    checkers: [
      {
        id: 8,
        color: "white",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 9,
        color: "white",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 10,
        color: "white",
        hasMove: false,
        isSelected: false,
      },
    ],
  },
  {
    index: 8,
    direction: "up",
    highlight: false,
    checkers: [],
  },
  {
    index: 9,
    direction: "up",
    highlight: false,
    checkers: [],
  },
  {
    index: 10,
    direction: "up",
    highlight: false,
    checkers: [],
  },
  {
    index: 11,
    direction: "up",
    highlight: false,
    checkers: [
      {
        id: 11,
        color: "black",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 12,
        color: "black",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 13,
        color: "black",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 14,
        color: "black",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 15,
        color: "black",
        hasMove: false,
        isSelected: false,
      },
    ],
  },
  {
    index: 12,
    direction: "down",
    highlight: false,
    checkers: [
      {
        id: 16,
        color: "white",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 17,
        color: "white",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 18,
        color: "white",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 19,
        color: "white",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 20,
        color: "white",
        hasMove: false,
        isSelected: false,
      },
    ],
  },
  {
    index: 13,
    direction: "down",
    highlight: false,
    checkers: [],
  },
  {
    index: 14,
    direction: "down",
    highlight: false,
    checkers: [],
  },
  {
    index: 15,
    direction: "down",
    highlight: false,
    checkers: [],
  },
  {
    index: 16,
    direction: "down",
    highlight: false,
    checkers: [
      {
        id: 21,
        color: "black",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 22,
        color: "black",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 23,
        color: "black",
        hasMove: false,
        isSelected: false,
      },
    ],
  },
  {
    index: 17,
    direction: "down",
    highlight: false,
    checkers: [],
  },
  {
    index: 18,
    direction: "down",
    highlight: false,
    checkers: [
      {
        id: 24,
        color: "black",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 25,
        color: "black",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 26,
        color: "black",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 27,
        color: "black",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 28,
        color: "black",
        hasMove: false,
        isSelected: false,
      },
    ],
  },
  {
    index: 19,
    direction: "down",
    highlight: false,
    checkers: [],
  },
  {
    index: 20,
    direction: "down",
    highlight: false,
    checkers: [],
  },
  {
    index: 21,
    direction: "down",
    highlight: false,
    checkers: [],
  },
  {
    index: 22,
    direction: "down",
    highlight: false,
    checkers: [],
  },
  {
    index: 23,
    direction: "down",
    highlight: false,
    checkers: [
      {
        id: 29,
        color: "white",
        hasMove: false,
        isSelected: false,
      },
      {
        id: 30,
        color: "white",
        hasMove: false,
        isSelected: false,
      },
    ],
  },
];
class GameManager {
  constructor() {
    this.players = [];
    this.rooms = [];
  }
  findRoomById(id) {
    return this.rooms.find((room) => room.id === id);
  }
  findPlayerById(id) {
    return this.players.find((player) => player.id === id);
  }
  updatePlayer(playerId, update) {
    const playerIndex = this.players.findIndex(
      (player) => player.id === playerId
    );
    if (playerIndex === -1) {
      return {};
    }
    this.players[playerIndex] = {
      ...this.players[playerIndex],
      ...update,
    };
    return this.players[playerIndex];
  }
  createRoom() {
    const roomId = new ShortUniqueId({ length: 10 }).rnd();
    const room = {
      id: roomId,
      players: [],
      status: "WAITING",
      winner: "",
      turn: "white",
      board: initialBoard,
      hits: [],
      collects: [],
    };
    this.rooms.push(room);
    return room;
  }

  addPlayer(player) {
    const data = {
      id: player.id,
      nickname: `Anonim${player.id.slice(0, 5)}`,
    };
    this.players.push(data);
    return this.players;
  }
  removePlayer(id) {
    this.players = this.players.filter((p) => p.id !== id);
    return this.players;
  }
  joinRoom(userId, roomId) {
    const roomIndex = this.rooms.findIndex(
      (room) =>
        room.id === roomId &&
        room.players.every((player) => player.id !== userId)
    );

    if (roomIndex === -1) {
      return;
    }
    const playerCount = this.rooms[roomIndex].players.length;
    //if player count is not 0 or 1 then there are spectators
    const hasColor = [0, 1].includes(playerCount);
    const update = {};
    if (hasColor) {
      update.color = playerCount === 0 ? "white" : "black";
    }
    const player = this.updatePlayer(userId, update);
    this.rooms[roomIndex].players.push(player);
    return this.rooms[roomIndex];
  }
  findAndUpdateRoom(roomId, updates) {
    const roomIndex = this.rooms.findIndex((room) => room.id === roomId);
    this.rooms[roomIndex] = { ...this.rooms[roomIndex], ...updates };
    return this.rooms[roomIndex];
  }
}

module.exports = new GameManager();
