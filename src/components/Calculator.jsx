import { useState } from 'react'
import Display from './Display.jsx'
import Button from './Button.jsx'
import evaluate from '../utils/evaluate.js'

export default function Calculator() {
  const [accumulator, setAccumulator] = useState(null)
  const [operator, setOperator]       = useState(null)
  const [current, setCurrent]         = useState('')

  const keys = [
    { value: 'AC', type: 'function' }, { value: '±',  type: 'function' },{ value: '%',  type: 'special'  },{ value: '⌫', type: 'function' },

    { value: '7' }, { value: '8' }, { value: '9' }, { value: '×', type: 'operator' },
    { value: '4' }, { value: '5' }, { value: '6' }, { value: '−', type: 'operator' },
    { value: '1' }, { value: '2' }, { value: '3' }, { value: '+', type: 'operator' },

    { value: '0'  }, { value: '.' }, { value: '=',  type: 'operator' },{ value: '÷', type: 'operator' },
  ]

  function onKey(val) {
    if (/[0-9.]/.test(val))    return handleNumber(val)
    if (val === 'AC')          return handleClear()
    if (val === '±')           return handleToggleSign()
    if (val === '⌫')           return handleDelete()
    if (val === '=')           return handleEqual()
    return handleOperator(val)
  }

  function handleNumber(d) {
    if(d === '.' && current.includes('.')) return
    if (!operator && accumulator !== null) {
      setAccumulator(null)
      setCurrent(d)
      return
    }
    if (current.length < 9) setCurrent(prev => prev + d)
  }

    function handleOperator(op) {
        if ((op === '-' || op === '−') && current === '') {
            setCurrent('-')
            return
        }
        if (accumulator === null && current !== '' && current !== '-') {
            setAccumulator(parseFloat(current))
            setOperator(op)
            setCurrent('')
            return
        }
        if (current === '-' || current === '') {
            setOperator(op)
            return
        }
        const res = evaluate(accumulator, parseFloat(current), operator)
        if (typeof res === 'number' && (res < 0 || Math.abs(res) > 999999999)) {
            setAccumulator(null)
            setOperator(null)
            setCurrent('ERROR')
        } else {
            setAccumulator(res)
            setOperator(op)
            setCurrent('')
        }
    }

    function handleEqual() {
    if (operator && current !== '') {
        const res = evaluate(accumulator, parseFloat(current), operator)
        if (typeof res === 'number' && (res < 0 || Math.abs(res) > 999999999)) {
            setAccumulator(null)
            setOperator(null)
            setCurrent('ERROR')
        } else {
            setAccumulator(null)
            setOperator(null)
            setCurrent(res)
        }
    }
    }

  function handleClear() {
    setAccumulator(null)
    setOperator(null)
    setCurrent('')
  }

  function handleToggleSign() {
    setCurrent(prev => prev.startsWith('-') ? prev.slice(1) : '-' + prev)
  }

  function handleDelete() {
    setCurrent(prev => prev.slice(0, -1))
  }

  const expression = operator
    ? `${accumulator ?? ''} ${operator} ${current}`
    : ''
    const result = (() => {
        if (current === 'ERROR') return 'ERROR'
        if (!operator && current === '' && accumulator !== null) return accumulator
        if (operator && current !== '') return evaluate(accumulator, parseFloat(current), operator)
        if(!isNaN(current) && current !== '') return Number(current)
        return current || '0'
    })()

    const displayResult = result === 'ERROR'
        ? 'ERROR'
        : (typeof result === 'number' && (result < 0 || Math.abs(result) > 999999999))
            ? 'ERROR'
            : String(result)
  return (
    <div className="
      w-full               /* móvil: ancho completo */
      h-full               /* móvil: altura completa del padre (h-screen) */
      sm:w-80              /* desktop: ancho fijo ≈20rem */
      sm:h-auto            /* desktop: altura según contenido */
      mx-auto              /* desktop: centrado horizontal */
      p-4 
      bg-gray-900 
      rounded-none sm:rounded-2xl 
      shadow-2xl
      flex flex-col
    ">
      {/* DISPLAY */}
      <Display expression={expression} result={displayResult} />

      {/* TECLADO */}
      <div className="
        grid grid-cols-4 grid-rows-5 gap-2 mt-2
        auto-rows-fr    
        flex-1        
      ">
        {keys.map(({ value, type, wide }, i) => (
          <Button
            key={i}
            value={value}
            type={type}
            onClick={onKey}
            className={wide ? 'col-span-2' : ''}
          />
        ))}
      </div>
    </div>
  )

}