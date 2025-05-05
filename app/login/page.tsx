"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";

export default function Login() {
const router = useRouter();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      await login({ email, password });
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-center text-black text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {error && <div className="text-red-500">{error}</div>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border text-black rounded-md border-gray-300 "
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border text-black rounded-md border-gray-300 "
          />
          <button type="submit" className="p-2 bg-[#efd055] text-white rounded-md hover:bg-[#D97706]">
           Login
          </button>
        </form>
        
        <p className="text-center text-gray-400 text-sm mt-4">
           Don&apos;t have an account?{` `} 
          <Link 
            className="text-[#efd055] cursor-pointer hover:underline" 
            href="/signup"
          >
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}