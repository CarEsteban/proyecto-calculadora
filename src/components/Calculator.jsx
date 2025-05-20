import { useState } from "react"
import Display from "./Display"
import Button from "./Button"
import evaluate from "../utils/evaluate.js"

export default function Calculator() {
    const [display, setDisplay] = useState('')
    const [pendingOp, setPendingOp] = useState(null)
    const [accumulator, setAccumulator] = useState(null)

    const keys = [
        { value: 'AC',    type: 'function' },
        { value: '±',     type: 'function' },
        { value: '%',     type: 'special' },
        { value: '÷',     type: 'operator' },

        { value: '7' }, { value: '8' }, { value: '9' }, { value: '×', type: 'operator' },
        { value: '4' }, { value: '5' }, { value: '6' }, { value: '−', type: 'operator' },
        { value: '1' }, { value: '2' }, { value: '3' }, { value: '+', type: 'operator' },

        { value: '0',    type: 'number',   wide: true }, 
        { value: '.',    type: 'number' },
        { value: '⌫',    type: 'function' },
        { value: '=',    type: 'operator' },
    ]
    
    function onKeyClick(val){
        if (/[0-9.]/.test(val))          return handleNumber(val)
        if (val === 'AC')                return handleClear()
        if (val === '±')                 return handleToggleSign()
        if (val === '⌫')                 return handleDelete()
        if (val === '=')                 return handleEqual()
        if (/[%÷×−+]/.test(val))         return handleOperator(val)
    }

    function handleNumber(d) {
        setDisplay(prev => (prev.length < 9 ? prev + d : prev))
    }

    function handleClear() {
        setDisplay('')
        setAccumulator(null)
        setPendingOp(null)
    }

    function handleToggleSign() {
        setDisplay(prev => prev.startsWith('-') ? prev.slice(1) : '-' + prev)
    }

    function handleDelete() {
        setDisplay(prev => prev.slice(0, -1))
    }

    function handleOperator(op) {
        if (display === '' && accumulator == null) return
        if (accumulator == null) {
        setAccumulator(parseFloat(display))
        } else if (pendingOp) {
        const result = evaluate(accumulator, parseFloat(display), pendingOp)
        setAccumulator(result)
        setDisplay(String(result))
        }
        setDisplay('')
        setPendingOp(op)
    }

    function handleEqual() {
        if (pendingOp && accumulator != null) {
        const result = evaluate(accumulator, parseFloat(display), pendingOp)
        setDisplay(String(result))
        setAccumulator(null)
        setPendingOp(null)
        }
    }

    return (
        <div className="
        w-full sm:w-80 mx-auto
        p-4 bg-gray-900 rounded-2xl shadow-2xl
        flex flex-col
        ">
        <Display value={display} />

        <div className="
            grid grid-cols-4 gap-2 mt-4
        ">
            {keys.map(({ value, type, wide }, i) => (
            <Button
                key={i}
                value={value}
                type={type}
                onClick={onKeyClick}
                className={wide ? 'col-span-2' : ''}
            />
            ))}
        </div>
        </div>
    )
}
