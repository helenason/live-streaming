/**
 * SERVER
 */

import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`); // http & ws protocol이 같은 port 공유

const server = http.createServer(app); // http 서버 생성
const wss = new WebSocket.Server({ server }); // http 서버 위에 ws 서버 생성

const sockets = []; // fake DB를 통해서 메시지를 모든 브라우저에 전달 가능하도록

wss.on("connection", (socket) => {
  // 브라우저 별 event handler
  // connection -> socket 발생
  // socket == 연결된 브라우저
  sockets.push(socket);
  console.log("Connected to Browser ^^");
  socket.on("close", () => {
    console.log("Disconnected from Browser ㅠㅠ");
  });
  socket.on("message", (message) => {
    console.log(message.toString());
    sockets.forEach((aSocket) => aSocket.send(message.toString()));
  });
});

// socket: 브라우저와 서버 사이의 contact 라인 (연결된 사람의 정보)

server.listen(3000, handleListen);
