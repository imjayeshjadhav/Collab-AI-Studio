import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../services/api";
import { toast } from "react-toastify";

export default function Signup() {

  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const handleSignUp = async (e) =>{
    e.preventDefault()

    if (!username || !password || !email){
        toast.error("Please fill all the required fields")
        setLoading(false)
        return;
    }
    setLoading(true)

    try {
        const response = await fetch (`${API_URL}/api/auth/signup`, {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: username, email, password }),
        })

        const data = await response.json()
        console.log(data)
        if (!response.ok) { 
            toast.error(data.message || "Signup failed, please try again")
            setLoading(false)   
            return 
        }
        
        if(response.ok){
            toast.success("User created successfully")
            navigate("/")
        }

    } catch (error) {
        console.log("Error signing Up")
        toast.error("Signup failed please try again")
    } finally {
        setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-100 to-cyan-100 px-4">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md border border-white/40 shadow-2xl rounded-2xl p-10 animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 shadow-inner mx-auto mb-4">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 21v-2a4 4 0 00-8 0v2M12 7a4 4 0 100-8 4 4 0 000 8z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-indigo-800">Create Account</h2>
          <p className="text-sm text-gray-600 mt-1">Join our platform in seconds!</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block mb-1 text-indigo-700 font-medium">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-white/80 border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              placeholder="Set Username"
              required
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-indigo-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-white/80 border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-indigo-700 font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-white/80 border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            onClick={handleSignUp}
            className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 transition-all"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-gray-700 text-sm">
            <p className=" text-center text-gray-700 text-sm">
            Already have an account?{" "}
            <Link
                to="/login"
                className="text-blue-600 font-semibold hover:underline"
            >
                Login
            </Link>
            </p>
        </div>
      </div>
    </div>
  );
}


