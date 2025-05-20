import React from "react"

export default function Display({value}){
    const num = parseFloat(value)

    const isNegative = value.startsWith('-') && !isNaN(num)
    const isTooBig = !isNaN(num) && num > 999_999_999

    let text
    if (isNegative || isTooBig) {
        text = 'ERROR'
    } else {
        // Si están entrando más de 9 caracteres, los cortamos
        text = value.length > 9 ? value.slice(0, 9) : value
        // Mostramos "0" si está vacío
        if (text === '') text = '0'
    }
    return(
        <div className='
            bg-gray-900
            text-green-400 
            font-mono 
            text-3xl
            text-right
            p-4
            rounded-md
            shadow-inner
            select-none
        '>
            {text}
        </div>
    )
}

