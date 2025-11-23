 let broadcasts = [
  { id: 1, message: "HELLO", status: "Pending" },
  { id: 2, message: "HI", status: "Pending" },
  { id: 3, message: "GOOD DAY", status: "Pending" },
];

let subscribers = [];

// Notify all subscribers of the updated broadcasts
function notify() {
  subscribers.forEach((cb) => cb([...broadcasts]));
}

// Simulate API: get all broadcasts
export async function getBroadcasts() {
  return [...broadcasts];
}

// Simulate API: create a new broadcast
export async function createBroadcast(message) {
  const newBroadcast = {
    id: Date.now(),
    message,
    status: "Pending",
  };
  broadcasts.push(newBroadcast);
  notify(); // update all subscribers
  return newBroadcast;
}

// Simulate API: send a broadcast
export async function sendBroadcast(id) {
  broadcasts = broadcasts.map((b) =>
    b.id === id ? { ...b, status: "Sent" } : b
  );
  notify();
  return broadcasts.find((b) => b.id === id);
}

// Simulate API: delete a broadcast
export async function deleteBroadcast(id) {
  broadcasts = broadcasts.filter((b) => b.id !== id);
  notify();
  return true;
}

// Real-time subscription (mock WebSocket)
export function subscribe(callback) {
  subscribers.push(callback);
  // immediately send current broadcasts
  callback([...broadcasts]);

  // return unsubscribe function
  return () => {
    subscribers = subscribers.filter((cb) => cb !== callback);
  };
}
