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

  // **NEGATIVO** o **FUERA DE RANGO** devuelven ERROR
  if (typeof res === 'number' && (res < 0 || Math.abs(res) > 999999999)) {
    return 'ERROR'
  }

  const s = String(res)
  // si la cadena excede 9 caracteres, ERROR
  return s.length > 9 ? 'ERROR' : res
}
