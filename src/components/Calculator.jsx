// src/components/Calculator.jsx
import { useState } from 'react'
import Display from './Display.jsx'
import Button from './Button.jsx'
import evaluate from '../utils/evaluate.js'

export default function Calculator() {
  const [accumulator, setAccumulator] = useState(null)
  const [operator, setOperator]       = useState(null)
  const [current, setCurrent]         = useState('')

  const keys = [
    { value: 'AC', type: 'function' },
    { value: '±',  type: 'function' },
    { value: '%',  type: 'special'  },
    { value: '⌫', type: 'function' },

    { value: '7' }, { value: '8' }, { value: '9' }, { value: '×', type: 'operator' },
    { value: '4' }, { value: '5' }, { value: '6' }, { value: '−', type: 'operator' },
    { value: '1' }, { value: '2' }, { value: '3' }, { value: '+', type: 'operator' },

    { value: '0' }, { value: '.' }, { value: '=', type: 'operator' }, { value: '÷', type: 'operator' },
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
    if (d === '.' && current.includes('.')) return
    // Si acabas de ver un resultado sin operador, reinicia al teclear número
    if (!operator && accumulator !== null) {
      setAccumulator(null)
      setCurrent(d)
      return
    }
    if (current.length < 9) setCurrent(prev => prev + d)
  }

  function handleOperator(op) {
    // Permitir signo negativo como primer paso
    if ((op === '-' || op === '−') && current === '') {
      setCurrent('-')
      return
    }
    // Primera operación válida
    if (accumulator === null && current !== '' && current !== '-') {
      setAccumulator(parseFloat(current))
      setOperator(op)
      setCurrent('')
      return
    }
    // Solo cambiar operador
    if (current === '' || current === '-') {
      setOperator(op)
      return
    }
    // Encadenar cálculo
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
    if (operator && current !== '' && current !== '-') {
      const res = evaluate(accumulator, parseFloat(current), operator)
      if (typeof res === 'number' && (res < 0 || Math.abs(res) > 999999999)) {
        setAccumulator(null)
        setOperator(null)
        setCurrent('ERROR')
      } else {
        setAccumulator(null)
        setOperator(null)
        setCurrent(String(res))
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

  // Construir expresión y resultado a mostrar
  const expression = operator
    ? `${accumulator ?? ''} ${operator} ${current}`
    : ''
  const result = (() => {
    if (current === 'ERROR') return 'ERROR'
    if (!operator && current === '' && accumulator !== null) return accumulator
    if (operator && current !== '' && current !== '-') {
      return evaluate(accumulator, parseFloat(current), operator)
    }
    if (!isNaN(current) && current !== '') return Number(current)
    return '0'
  })()
  const displayResult = result === 'ERROR'
    ? 'ERROR'
    : String(result)

  return (
    <div className="
      w-full
      sm:w-110
      mx-auto
      bg-gray-900 p-4
      rounded-none sm:rounded-2xl
      shadow-2xl
      flex flex-col
      h-full sm:h-auto
      sm:aspect-[3/4]
      sm:max-h-[650px]
    ">
      <Display expression={expression} result={displayResult} />

      <div className="
        grid grid-cols-4 grid-rows-5 gap-2 mt-2
        auto-rows-fr
        h-full 
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
