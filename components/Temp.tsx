import React from 'react'

interface TempProps {
  value: string;
}

export default function Temp({value}: TempProps) {  
  return (
    <div className='bg-white rounded-xl shadow-sm p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-xl font-bold text-[#2D3553]'>Gas Level</h2>
            </div>
            
            <div className='space-y-4'>
              <div className='flex items-center p-3 hover:bg-[#F8FAFC] rounded-lg transition-colors'>
                <div className='bg-[#FEF3C7] p-2 rounded-full mr-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-[#D97706]">
                    <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className='text-2xl font-bold text-[#D97706]'>{value} ppm</p>
                </div>
              </div>
            </div>
          </div>
  )
}
