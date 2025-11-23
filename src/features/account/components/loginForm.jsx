import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; 
import { useNavigate } from "react-router-dom"; 

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); 

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // --- Backend call  ---
    // axios.post("http://localhost:3000/api/login", formData)
    //   .then(response => {
    //     // handle successful login
    //   })
    //   .catch(error => {
    //     setMessage("Login failed");
    //   });

    console.log(formData);
    setMessage("Login attempt sent (backend call commented)");

    // --- Navigate to dashboard ---
    navigate("/dashboard"); 
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center font-comfortaa bg-gradient-to-b from-green-200 to-green-50 relative overflow-hidden p-4">
      {/* Decorative Circles */}
      <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-green-400 rounded-full opacity-30 z-0"></div>
      <div className="absolute left-10 bottom-10 w-40 h-40 bg-green-500 rounded-full opacity-60 z-0"></div>
      <div className="absolute -right-10 bottom-0 w-32 h-32 bg-green-600 rounded-full opacity-50 z-0"></div>

      {/* Form Container */}
      <div className="z-10 w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-100 to-green-400 p-8 relative text-center text-white">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-20 rounded-full z-0" />
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-1 text-green-900">Welcome Back</h1>
            <p className="text-sm text-green-800">Sign in to continue</p>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8 sm:p-10 bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="peer w-full border-b border-green-500 pt-6 pb-1 px-2 text-sm text-green-900 bg-transparent placeholder-transparent focus:outline-none"
                required
              />
              <label
                htmlFor="email"
                className="absolute left-2 top-1.5 text-sm text-green-700 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-green-400 peer-focus:top-1.5 peer-focus:text-sm peer-focus:text-green-700"
              >
                Email*
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="peer w-full border-b border-green-500 pt-6 pb-1 px-2 text-sm text-green-900 bg-transparent placeholder-transparent focus:outline-none"
                required
              />
              <label
                htmlFor="password"
                className="absolute left-2 top-1.5 text-sm text-green-700 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-green-400 peer-focus:top-1.5 peer-focus:text-sm peer-focus:text-green-700"
              >
                Password*
              </label>
              <button
                type="button"
                className="absolute right-2 top-5 text-green-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-2 rounded text-white text-sm bg-green-600 hover:bg-green-700 transition shadow-md"
            >
              Login
            </button>

            {/* Message */}
            {message && (
              <p className="text-red-500 text-center text-sm mt-2">{message}</p>
            )}

            {/* Signup Link */}
            <p className="text-center text-green-800 text-sm mt-4">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-green-700 font-semibold hover:underline"
              >
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
