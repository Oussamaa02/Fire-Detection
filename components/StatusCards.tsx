import React from 'react'

interface StatusCardsProps {
  condition: string;
  alert: boolean;
}

export default function StatusCards({condition, alert}: StatusCardsProps) {
  return (
    <div className='bg-white rounded-xl shadow-sm p-6 mb-6'>
          <h2 className='text-xl font-bold text-[#2D3553] mb-4'>Fire Detection Overview</h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Status Card */}
            <div className={`${condition==="Normal" ? "bg-[#F0FDF4] border-[#DCFCE7]" : "bg-[#FEF2F2] border-[#FECACA] "} p-4 rounded-lg border `}>
              <div className='flex items-center justify-between'>
                <h3 className={`${condition === "Normal" ? "text-[#14532D]" : "text-[#7F1D1D]"} font-medium`}>System Condition</h3>
                <div className={`${condition==="Normal" ? "bg-[#22C55E]" :"bg-[#EF4444]"} animate-pulse h-3 w-3 rounded-full`}></div>
              </div>
              <p className={`text-2xl font-bold mt-2 ${condition==="Normal" ? "text-[#166534]" :"text-[#7F1D1D]" }`}>{condition}</p>
            </div>
            
            {/* Alerts Card */}
            <div className='bg-[#FEF2F2] p-4 rounded-lg border border-[#FECACA]'>
              <div className='flex items-center justify-between'>
                <h3 className='font-medium text-[#7F1D1D]'>Active Alerts</h3>
                <div className='h-3 w-3 rounded-full bg-[#EF4444] animate-pulse'></div>
              </div>
              <p className='text-2xl font-bold mt-2 text-[#B91C1C]'>{condition === "Fire" ? "1" : "0"}</p>
              <p className='text-sm text-[#991B1B] mt-1'>Requires attention</p>
            </div>
          </div>
        </div>
  )
}
