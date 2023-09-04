/**
 * SERVER
 */

import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`); // http & ws protocol이 같은 port 공유

const httpServer = http.createServer(app); // http 서버 생성
const wsServer = SocketIO(httpServer); // localhost:3000/socket.io/socket.io.js 라는 url을 줌

wsServer.on("connection", (socket) => {
  socket.onAny((event) => {
    // like middleware or spy
    console.log(`Socket Event: ${event}`);
  });
  socket.on("enter_room", (roomName, done) => {
    // socket.rooms의 첫번째 데이터 == socket.id (user와 server 간의 기본 private room)
    socket.join(roomName); // socket.rooms에 roomName 추가
    done(); // 백엔드가 코드 실행(X, 보안 문제) -> 프론트에서 코드 실행(O), argument 전달도 가능
  });
});

httpServer.listen(3000, handleListen);
