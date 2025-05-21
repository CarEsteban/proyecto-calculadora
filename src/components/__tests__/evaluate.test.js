import { describe, it, expect } from 'vitest'
import evaluate from '../../utils/evaluate.js'

describe('evaluate', () => {
  it('suma correctamente', () => {
    expect(evaluate(2, 3, '+')).toBe(5)
  })

  it('resta correctamente', () => {
    expect(evaluate(10, 4, '-')).toBe(6)
    expect(evaluate(10, 4, '−')).toBe(6)
  })

  it('multiplica correctamente', () => {
    expect(evaluate(3, 4, 'x')).toBe(12)
    expect(evaluate(3, 4, '×')).toBe(12)
  })

  it('divide correctamente', () => {
    expect(evaluate(12, 4, '÷')).toBe(3)
  })

  it('muestra ERROR si se divide por cero', () => {
    expect(evaluate(10, 0, '÷')).toBe('ERROR')
  })

  it('realiza módulo correctamente', () => {
    expect(evaluate(10, 3, '%')).toBe(1)
  })

  it('muestra ERROR si el resultado es negativo', () => {
    expect(evaluate(2, 5, '−')).toBe('ERROR')
    expect(evaluate(2, 5, '-')).toBe('ERROR')
    expect(evaluate(2, 3, '-')).toBe('ERROR')
  })

  it('muestra ERROR si el resultado es mayor a 999999999', () => {
    expect(evaluate(999999999, 1, '+')).toBe('ERROR')
    expect(evaluate(500000000, 500000000, '+')).toBe('ERROR')
  })

  it('muestra ERROR si el resultado tiene más de 9 dígitos', () => {
    expect(evaluate(99999999, 99999999, '×')).toBe('ERROR')
  })

  it('muestra ERROR si el módulo es por cero', () => {
    expect(evaluate(10, 0, '%')).toBe('ERROR')
  })

  it('devuelve el segundo número si el operador es desconocido', () => {
    expect(evaluate(5, 7, '^')).toBe(7)
  })

  it('acepta números negativos como entrada', () => {
    expect(evaluate(-5, 6, '+')).toBe(1)
    expect(evaluate(-5, -3, '+')).toBe('ERROR')
  })

  it('acepta 0 como entrada', () => {
    expect(evaluate(0, 0, '+')).toBe(0)
    expect(evaluate(0, 5, '+')).toBe(5)
    expect(evaluate(5, 0, '÷')).toBe(5 / 0 === Infinity ? 'ERROR' : 5 / 0)
  })
})
