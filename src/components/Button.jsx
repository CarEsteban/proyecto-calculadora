export default function Button ({ value, type = 'number', onClick, className = '' }) {
  const base = 'flex items-center justify-center font-semibold rounded-full shadow transition'
  const color = {
    number: 'bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white',
    operator: 'bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white',
    special: 'bg-gray-600 hover:bg-gray-500 active:bg-gray-700 text-white',
    function: 'bg-gray-700 hover:bg-gray-600 active:bg-gray-800 text-white'
  }[type]

  return (
    <button
      onClick={() => onClick(value)}
      className={`${base} ${color} w-full h-full ${className}`}
    >
      {value}
    </button>
  )
}
