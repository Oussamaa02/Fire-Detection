import React from 'react'

interface AlertProps {
  condition: string;
}

export default function Alert({condition }: AlertProps) {
  return (
    <div className='bg-white rounded-xl shadow-sm p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-xl font-bold text-[#2D3553]'>Alerts</h2>
            </div>
            
            <div className='space-y-4'>
              <div className='flex items-center p-3 hover:bg-[#F8FAFC] rounded-lg transition-colors'>
                <div className='bg-[#FEE2E2] p-2 rounded-full mr-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#EF4444]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className='text-2xl font-bold text-[#EF4444]'>{condition ==="Fire" ? "Fire detected !" : ""}</p>

                </div>
              </div>
            </div>
          </div>
  )
}
