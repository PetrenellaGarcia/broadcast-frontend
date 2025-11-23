import { useEffect, useState } from "react";
import { Send, Trash2, Plus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { sendBroadcast, deleteBroadcast, subscribe } from "../features/broadcast/services/broadcastService";
import CreateBroadcastModal from "../components/custom/createBroadcastModal";
import Header from "../components/ui/header";
import Modal from "../components/ui/modal";

export default function DashboardPage() {
  const [broadcasts, setBroadcasts] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
  const unsubscribe = subscribe((data) => {
    setBroadcasts(data); // automatically update when new broadcast added
  });

  return () => unsubscribe();
}, []);


  const handleSend = async (id) => {
    await sendBroadcast(id);
    setBroadcasts(prev => prev.map(b => (b.id === id ? { ...b, status: "Sent" } : b)));
    toast.success("Broadcast sent!", { position: "top-center" });
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteBroadcast(selectedId);
    setBroadcasts(prev => prev.filter(b => b.id !== selectedId));
    toast.success("Broadcast deleted!", { position: "top-center" });
    setIsDeleteModalOpen(false);
  };

  const handleCreated = (newBroadcast) => {
    setBroadcasts(prev => [...prev, newBroadcast]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header title="Broadcast Dashboard" />
      <Toaster />

      <div className="p-4 md:p-6 lg:p-8 flex-1">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-green-600 text-white py-2 px-4 rounded shadow hover:bg-green-700 transition flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" /> Create New Broadcast
          </button>
        </div>

        <div className="space-y-2">
          {broadcasts.length === 0 && (
            <p className="text-center text-gray-500">No broadcasts available.</p>
          )}
          {broadcasts.map(b => (
            <div key={b.id} className="flex flex-col sm:flex-row justify-between items-center bg-white p-3 rounded shadow text-sm">
              <div className="flex-1 truncate">
                <strong>{b.message}</strong>{" "}
                <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
                  b.status === "Sent" ? "bg-green-100 text-green-800" :
                  b.status === "Failed" ? "bg-red-100 text-red-800" :
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  {b.status}
                </span>
              </div>

              <div className="flex space-x-2 mt-2 sm:mt-0 ml-0 sm:ml-4">
                <button
                  onClick={() => handleSend(b.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded flex items-center transition text-xs"
                >
                  <Send className="w-4 h-4 mr-1" /> Send
                </button>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center transition text-xs"
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Broadcast Modal */}
      <CreateBroadcastModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={handleCreated} 
      />

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Delete">
        <p>Are you sure you want to delete this broadcast?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="px-4 py-2 border rounded hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
