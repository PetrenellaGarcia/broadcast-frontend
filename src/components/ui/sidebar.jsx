import { useState, useEffect } from "react";
import { Home, Plus, LogOut, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // For mobile toggle
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    alert("Logged out!");
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home className="w-5 h-5" /> },
    { name: "Create Broadcast", path: "/create-broadcast", icon: <Plus className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Hamburger for mobile */}
      {isMobile && (
        <div className="flex items-center justify-between bg-white p-4 shadow-md">
          <h2 className="text-lg font-bold text-green-800">BroadcastApp</h2>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6 text-green-800" /> : <Menu className="w-6 h-6 text-green-800" />}
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-white w-64 min-h-screen p-6 flex flex-col fixed z-50 transition-transform duration-300
          ${isMobile ? `${isOpen ? "translate-x-0" : "-translate-x-full"}` : "translate-x-0"} shadow-md`}
      >
        {/* Logo / Header */}
        <h2 className="text-2xl font-bold mb-6 text-green-800 hidden md:block">BroadcastApp</h2>

        {/* Menu */}
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 p-2 rounded transition 
                ${location.pathname === item.path ? "bg-green-100 text-green-900" : "text-green-800 hover:bg-green-50"}`}
              onClick={() => isMobile && setIsOpen(false)}
            >
              {item.icon} <span>{item.name}</span>
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 p-2 rounded hover:bg-green-50 text-green-800 mt-auto"
          >
            <LogOut className="w-5 h-5" /> <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
