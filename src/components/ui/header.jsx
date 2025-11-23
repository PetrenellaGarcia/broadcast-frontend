import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function Header({ title, name = "User" }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">{title}</h1>

      <div className="flex items-center space-x-4">
        <span className="text-gray-700 text-sm">Hello, {name}!</span>
        <button
          onClick={handleLogout}
          className="text-gray-700 hover:text-red-600 transition"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
