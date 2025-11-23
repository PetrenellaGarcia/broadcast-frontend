export default function BroadcastItem({ broadcast, onSend }) {
  return (
    <div className="border p-2 mb-2 flex justify-between items-center">
      <span>{broadcast.message}</span>
      <span className="text-sm">{broadcast.status}</span>
      <button
        onClick={() => onSend(broadcast.id)}
        className="bg-blue-600 text-white px-2 py-1 rounded"
      >
        Send
      </button>
    </div>
  );
}
