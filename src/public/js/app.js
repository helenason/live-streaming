/**
 * BROWSER
 */

const socket = new WebSocket(`ws://${window.location.host}`); // socket == 서버로의 연결

socket.addEventListener("open", () => {
  console.log("Connected to Server ^^");
});

socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data, "from the Server");
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ㅠㅠ");
});

setTimeout(() => {
  socket.send("hello from the Browser!");
}, 5000);
