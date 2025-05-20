import React from 'react'

export default function Display({ expression, result }) {
  return (
    <div className="bg-gray-900 text-right p-4 rounded-md shadow-inner mb-2">
      <div className="text-sm text-gray-400 truncate h-6 leading-6">{expression || '\u00A0'}</div>
      <div className="text-3xl text-green-400 font-mono truncate">{result || '\u00A0'}</div>
    </div>
  )
}