import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../../services/api";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {

        e.preventDefault();
        // Handle login logic here 
        setLoading(true) 
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            })
            
            const data = await response.json();
            if (response.ok) {
                setUser(data.user);
                toast.success("Login successful!");
                navigate("/");
            } else {
                toast(data.message || "Login failed check credentials")
            }

        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Something went wrong. Try again later.");
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-300 via-blue-200 to-sky-300 px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/40 animate-fade-in-up">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shadow-md">
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
              />
              <circle cx="12" cy="7" r="4" strokeWidth="2" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-blue-800 mt-4">Welcome Back</h2>
          <p className="text-gray-600 text-sm mt-1">
            Log in to continue your journey!
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="username"
              required
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Password</label>
            <input
              type="password"
              value={password}
              placeholder="••••••••"
              onChange={(e)=> setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            />
          </div>

          <button
            onClick={handleLogin}
            type="submit"
            className="w-full py-2 rounded-lg text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 font-semibold transition-all duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-gray-700 text-sm">
          <p>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
