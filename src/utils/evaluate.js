export default function evaluate(a, b, op) {
    let res;
    switch (op) {
        case '+': res = a + b; break;
        case '−': res = a - b; break;
        case '×': res = a * b; break;
        case '÷': res = b !== 0 ? a / b : NaN; break;
        case '%': res = (a * b) / 100; break;
        default: res = b;
    }
    // Validar rango permitido
    if (typeof res === 'number' && (res < 0 || Math.abs(res) > 999999999)) {
        return 'ERROR';
    }
    const s = String(res);
    return s.length > 9 ? parseFloat(s.slice(0, 9)) : res;
}