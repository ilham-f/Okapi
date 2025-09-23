import { Server } from "socket.io";

export const stockSocket = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("buy", (data) => {
      console.log("Product bought:", data);
      socket.broadcast.emit("stockUpdate", data);
    });
  });
};
