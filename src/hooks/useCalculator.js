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
    { value: '7' }, { value: '8' }, { value: '9' }, { value: 'x', type: 'operator' },
    { value: '4' }, { value: '5' }, { value: '6' }, { value: '-', type: 'operator' },
    { value: '1' }, { value: '2' }, { value: '3' }, { value: '+', type: 'operator' },
    { value: '0' }, { value: '.' }, { value: '=', type: 'operator' }, { value: '÷', type: 'operator' }
  ]

  function onKey (val) {
    if (current === 'ERROR' && val !== 'AC') return // Solo permite limpiar después de error
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
    // Si ya hay acumulador, operador y current, calcula el resultado parcial
    if (accumulator !== null && operator && current !== '' && current !== '-') {
      const res = evaluate(accumulator, parseFloat(current), operator)
      if (res === 'ERROR') {
        setAccumulator(null)
        setOperator(null)
        setCurrent('ERROR')
      } else {
        setAccumulator(res)
        setOperator(op)
        setCurrent('')
      }
      return
    }
    // Si solo hay current, guarda como acumulador y operador
    if (accumulator === null && current !== '' && current !== '-') {
      setAccumulator(parseFloat(current))
      setOperator(op)
      setCurrent('')
      return
    }
    // Si solo cambia el operador
    if (current === '' || current === '-') {
      setOperator(op)
    }
  }

  function handleEqual () {
    if (operator && current !== '' && current !== '-') {
      const res = evaluate(accumulator, parseFloat(current), operator)
      if (res === 'ERROR') {
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

  // Lógica de resultado y displayResult corregida:
  const result = (() => {
    if (current === 'ERROR') return 'ERROR'
    // Si hay operador y current no es vacío ni solo '-', muestra el resultado parcial
    if (operator && current !== '' && current !== '-') {
      const res = evaluate(accumulator, parseFloat(current), operator)
      return res
    }
    // Si solo hay current, muestra current
    if (current !== '') return current
    // Si solo hay acumulador, muestra acumulador
    if (!operator && accumulator !== null) return accumulator
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
