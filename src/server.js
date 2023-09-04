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

function handleConnection(socket) { // socket == 연결된 브라우저
  console.log(socket);
}

wss.on("connection", handleConnection); // "on" method == event handler

// socket: 브라우저와 서버 사이의 contact 라인 (연결된 사람의 정보)

server.listen(3000, handleListen);