export default function evaluate (a, b, op) {
  let res
  switch (op) {
    case '+':
      res = a + b
      break
    case '-':
    case '−':
      res = a - b
      break
    case 'x':
    case '×':
      res = a * b
      break
    case '÷':
      if (b === 0) return 'ERROR'
      res = a / b
      break
    case '%':
      if (b === 0) return 'ERROR'
      res = a % b
      break
    default:
      res = b
  }

  // Negativo o fuera de rango absoluto sigue siendo ERROR
  if (typeof res === 'number' && (res < 0 || Math.abs(res) > 999999999)) {
    return 'ERROR'
  }

  // Redondear decimales para que el string no supere 9 caracteres
  if (typeof res === 'number' && !Number.isInteger(res)) {
    // Dejar máximo 8 decimales, luego recortar si aún es largo
    res = parseFloat(res.toFixed(8))
  }

  let s = String(res)
  // Si aún supera 9 caracteres, recortar y mostrar aproximado
  if (s.length > 9) {
    // Si es decimal, recortar a 9 caracteres
    if (s.includes('.')) {
      s = s.slice(0, 9)
      // Quitar punto final si quedó al final
      if (s.endsWith('.')) s = s.slice(0, -1)
      return s
    }
    // Si es entero largo, mostrar ERROR
    return 'ERROR'
  }

  return res
}
