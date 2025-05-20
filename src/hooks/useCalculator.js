import { useState } from 'react'
import evaluate from '../utils/evaluate.js'

export default function useCalculator () {
  const [accumulator, setAccumulator] = useState(null)
  const [operator, setOperator] = useState(null)
  const [current, setCurrent] = useState('')

  const keys = [
    { value: 'AC', type: 'function' },
    { value: '±', type: 'function' },
    { value: '%', type: 'special' },
    { value: '⌫', type: 'function' },

    { value: '7' }, { value: '8' }, { value: '9' }, { value: '×', type: 'operator' },
    { value: '4' }, { value: '5' }, { value: '6' }, { value: '−', type: 'operator' },
    { value: '1' }, { value: '2' }, { value: '3' }, { value: '+', type: 'operator' },

    { value: '0' }, { value: '.' }, { value: '=', type: 'operator' }, { value: '÷', type: 'operator' }
  ]

  function onKey (val) {
    if (/[0-9.]/.test(val)) return handleNumber(val)
    if (val === 'AC') return handleClear()
    if (val === '±') return handleToggleSign()
    if (val === '⌫') return handleDelete()
    if (val === '=') return handleEqual()
    return handleOperator(val)
  }

  function handleNumber (d) {
    if (d === '.' && current.includes('.')) return
    if (!operator && accumulator !== null) {
      setAccumulator(null)
      setCurrent(d)
      return
    }
    if (current.length < 9) setCurrent(prev => prev + d)
  }

  function handleOperator (op) {
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
    if (current === '' || current === '-') {
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

  function handleEqual () {
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

  function handleClear () {
    setAccumulator(null)
    setOperator(null)
    setCurrent('')
  }

  function handleToggleSign () {
    setCurrent(prev => prev.startsWith('-') ? prev.slice(1) : '-' + prev)
  }

  function handleDelete () {
    setCurrent(prev => prev.slice(0, -1))
  }

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

  return {
    keys,
    expression,
    displayResult,
    onKey
  }
}
