// src/components/Calculator.jsx
import useCalculator from '../hooks/useCalculator.js'
import Display from './Display.jsx'
import Button from './Button.jsx'

export default function Calculator () {
  const { keys, expression, displayResult, onKey } = useCalculator()
  return (
    <div className='w-full sm:w-110 mx-auto bg-gray-900 p-4 rounded-none sm:rounded-2xl shadow-2xl flex flex-col h-full sm:h-auto sm:aspect-[3/4] sm:max-h-[650px] '>
      <Display expression={expression} result={displayResult} />

      <div className='grid grid-cols-4 grid-rows-5 gap-2 mt-2 auto-rows-fr h-full '>
        {keys.map(({ value, type, wide }, i) => (
          <Button key={i} value={value} type={type} onClick={onKey} className={wide ? 'col-span-2' : ''} />
        ))}
      </div>
    </div>
  )
}
