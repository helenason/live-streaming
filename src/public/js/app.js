const socket = io(); // 자동으로 backend의 socket.io와 연결

const welcome = document.getElementById("welcome");
const room = document.getElementById("room");
const form = welcome.querySelector("form");

room.hidden = true;

let roomName = "";

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", { payload: input.value }, showRoom);
  // any name of event 설정 가능 & objects 전송 가능, 함수를 보내고 싶다면 무조건 마지막 argument로 보내기
  roomName = input.value;
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
