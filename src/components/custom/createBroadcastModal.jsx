import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createBroadcast } from "../../features/broadcast/services/broadcastService";
import toast from "react-hot-toast";

export default function CreateBroadcastModal({ isOpen, onClose, onCreated }) {
  const [newMessage, setNewMessage] = useState("");
  const [show, setShow] = useState(false); 

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timeout = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleCreate = async (e) => {
  e.preventDefault();
  try {
    await createBroadcast(newMessage); 
    setNewMessage("");
    onClose();
    toast.success("Broadcast created!");
  } catch (err) {
    toast.error("Failed to create broadcast.");
  }
};


  if (!isOpen && !show) return null;

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center z-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className={`relative bg-white rounded-lg w-11/12 max-w-lg p-6 shadow-lg transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Create Broadcast</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-600 hover:text-gray-800 transition" />
          </button>
        </div>

        <form onSubmit={handleCreate} className="space-y-4">
          <textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            required
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500 resize-none h-28"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
