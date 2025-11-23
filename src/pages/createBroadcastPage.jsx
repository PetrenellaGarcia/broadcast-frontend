import { useState } from "react";
import { createBroadcast } from "../features/broadcast/services/broadcastService";
import { useNavigate } from "react-router-dom";

export default function CreateBroadcastPage() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  await createBroadcast(message); // automatically updates dashboard
  setMessage(""); // reset input
  alert("Broadcast created!");
  navigate("/dashboard");
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create Broadcast</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}
