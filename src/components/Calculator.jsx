import React from 'react'
import useCalculator from '../hooks/useCalculator.js'
import Display from './Display.jsx'
import Button from './Button.jsx'

export default function Calculator () {
  const { keys, expression, displayResult, onKey } = useCalculator()
  return (
    <div className="w-screen min-h-[100dvh] max-h-[100dvh] flex flex-col bg-gray-900 p-4  rounded-none shadow-2xl pb-[env(safe-area-inset-bottom)]  sm:rounded-2xl sm:w-120 sm:mx-auto  sm:min-h-[70vh]">
      <Display expression={expression} result={displayResult} />
      <div className='grid grid-cols-4 grid-rows-5 gap-2 mt-2 auto-rows-fr flex-1 pb-5'>
        {keys.map(({ value, type, wide }, i) => (
          <Button key={i} value={value} type={type} onClick={onKey} className={wide ? 'col-span-2' : ''} />
        ))}
      </div>
    </div>
  )
}
