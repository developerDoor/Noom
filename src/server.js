import http from "http";
//import { WebSocketServer } from "ws";
import express from "express";
import SocketIO from "socket.io";
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

// 한 포트에서 http와소켓 모두 처리할 수 있다.
const httpServer = http.createServer(app);
const weServer = SocketIO(httpServer);

weServer.on("connection", (socket) => {
  socket.on("enter_room", (msg, doen) => {
    console.log(msg);
    setTimeout(() => {
      doen();
    }, 10000);
  });
});

// const sockets = [];
// const wss = new WebSocketServer({ server });
// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "Anon";
//   console.log("Connected to Browser!");
//   socket.on("close", () => {
//     console.log("Disconnected from Browser");
//   });
//   socket.on("message", (msg) => {
//     const message = JSON.parse(msg);
//     switch (message.type) {
//       case "new_message":
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket.nickname}: ${message.payload}`)
//         );
//       case "nickname":
//         socket["nickname"] = message.payload;
//     }
//   });
// });
const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
