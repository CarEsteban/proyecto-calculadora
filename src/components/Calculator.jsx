import React from 'react'
import useCalculator from '../hooks/useCalculator.js'
import Display from './Display.jsx'
import Button from './Button.jsx'

export default function Calculator () {
  const { keys, expression, displayResult, onKey } = useCalculator()
  return (
    <div className='fixed inset-0 w-screen h-screen sm:static sm:w-120 lg:min-h-3/4 sm:h-auto sm:mx-auto bg-gray-900 p-4 rounded-none sm:rounded-2xl shadow-2xl flex flex-col pb-[env(safe-area-inset-bottom)]'>
      <Display expression={expression} result={displayResult} />
      <div className='grid grid-cols-4 grid-rows-5 gap-2 mt-2 auto-rows-fr flex-1'>
        {keys.map(({ value, type, wide }, i) => (
          <Button key={i} value={value} type={type} onClick={onKey} className={wide ? 'col-span-2' : ''} />
        ))}
      </div>
    </div>
  )
}
