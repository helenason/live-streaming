/**
 * BROWSER
 */

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nickname");

const socket = new WebSocket(`ws://${window.location.host}`); // socket == 서버로의 연결

// function makeMessage(type, payload) {
//   const msg = { type, payload };
//   return JSON.stringify(msg);
// }

socket.addEventListener("open", () => {
  console.log("Connected to Server ^^");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ㅠㅠ");
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value.toString()); // 강의에서와는 달리 toString()을 해주어야 buffer 형태로 전달되지 않았다
  input.value = "";
}

// function handleNickSubmit(event) {
//   event.preventDefault();
//   const input = nickForm.querySelector("input");
//   socket.send(makeMessage("nickname", input.value.toString()));
//   input.value = "";
// }

messageForm.addEventListener("submit", handleSubmit);
// nickForm.addEventListener("submit", handleNickSubmit);
