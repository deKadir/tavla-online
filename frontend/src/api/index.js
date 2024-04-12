import { io } from "socket.io-client";
import axios from "axios";
const baseURL = "http://localhost:3333/";
const req = axios.create({ baseURL });
const socket = io(baseURL);
const api = {
  getRoom: (id) => req.get(`/room/${id}`),
};

export { socket, api };
