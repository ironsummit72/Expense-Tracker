import React from 'react'
import { LabelList, RadialBar, RadialBarChart } from "recharts"
function App() {
  return (
    <div>
      <h1 className='font-bold text-2xl'>Summary</h1>
      <div className='flex gap-10 mt-10'>
        <div className="amount-text flex flex-col gap-1">
          <h3 className='font-bold text-black font-mono'>Net Total</h3>
          <h2 className='text-gray-600'>$2433434</h2>
        </div>

      </div>

    </div>
  )
}

export default App