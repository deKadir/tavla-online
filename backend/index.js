const express = require("express");
const cors = require("cors");
const Socket = require("./socket");
const app = express();
const manager = require("./gameManager");
app.use(cors({ origin: "*" }));
const socket = new Socket(app);
app.get("/room/:id", async function (req, res) {
  try {
    const room = manager.findRoomById(req.params.id);
    if (!room?.id) {
      return res.status(404).send("Room not found");
    }
    return res.status(200).json(room);
  } catch (error) {
    return res.status(500).send(JSON.stringify(error));
  }
});

const port = 3333;
socket.listen(port);
