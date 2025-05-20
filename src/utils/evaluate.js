export default function evaluate(a, b, op) {
  let res = 0
  switch (op) {
    case '+': res = a + b; break
    case '−': res = a - b; break
    case '×': res = a * b; break
    case '÷': res = b !== 0 ? a / b : NaN; break
    case '%': res = (a * b) / 100; break
  }
  // redondeo y límite de 9 dígitos
  const str = String(res)
  return str.length > 9 ? parseFloat(str.slice(0,9)) : res
}
