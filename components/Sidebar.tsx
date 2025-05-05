import { logout } from '@/services/authService';
import {useRouter} from 'next/navigation';
import React from 'react'

export default function Sidebar() {

  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await logout();
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    }
  };

  return (
    <div className='w-64 bg-white shadow-lg flex flex-col'>
        {/* Logo/Header Area */}
        <div className='p-6 border-b border-[#EEE5D1]'>
          <h1 className="text-[#2D3553] text-2xl font-bold tracking-tight">Fire Detection</h1>
          <p className='text-[#6B7280] text-sm font-medium'>Safety Monitoring Dashboard</p>
        </div>
        
        {/* Navigation */}
        <nav className='flex-1 p-4 space-y-2'>
          <button className='w-full flex items-center space-x-3 p-3 rounded-lg bg-[#FFEDD5] text-[#C2410C] font-medium'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span>Dashboard</span>
          </button>
        </nav>

        {error && (
          <div className="fixed top-5 right-10 bg-red-100 border border-red-400 text-red-700 px-2 py-2 rounded">
          {error}
          </div>
        )} 
        
        {/* User/Logout Area */}
        <div className='p-4 border-t border-[#EEE5D1]'>
          <button onClick={handleSubmit} className='w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-[#FEE2E2] text-[#DC2626] font-medium hover:bg-[#FECACA] transition-colors' >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            <span>Log out</span>
          </button>
        </div>
      </div>
  )
}