import { createBroadcast } from "./broadcastService";

let listeners = [];

export function connectMockSocket() {
  console.log("Mock WebSocket connected");
}

export function onNewBroadcast(callback) {
  listeners.push(callback);
}

// Simulate new broadcast every 10 seconds
setInterval(() => {
  const messages = ["HELLO", "HI", "GOOD DAY"];
  const randomMsg = messages[Math.floor(Math.random() * messages.length)];
  const newB = createBroadcast(randomMsg);
  listeners.forEach((cb) => cb(newB));
}, 10000);
