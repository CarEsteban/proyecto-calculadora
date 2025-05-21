/* eslint-env jest */
import React from 'react'
import { render, fireEvent, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import Calculator from '../Calculator'

function clickButton (label) {
  fireEvent.click(screen.getByText(label))
}

describe('Calculator (user-centric)', () => {
  it('no permite dos puntos decimales seguidos', () => {
    render(<Calculator />)
    clickButton('1')
    clickButton('.')
    clickButton('.')

    expect(
      within(screen.getByRole('status', { name: 'display' }))
        .getByText('1.')
    ).toBeInTheDocument()
  })

  it('AC limpia el estado', () => {
    render(<Calculator />)
    clickButton('1')
    clickButton('+')
    clickButton('2')
    clickButton('AC')

    expect(
      within(screen.getByRole('status', { name: 'display' }))
        .getByText('0')
    ).toBeInTheDocument()
  })

  it('no permite ingresar más de 9 dígitos numéricos', () => {
    render(<Calculator />)
    clickButton('1')
    clickButton('2')
    clickButton('3')
    clickButton('4')
    clickButton('5')
    clickButton('6')
    clickButton('7')
    clickButton('8')
    clickButton('9')
    clickButton('0') // Este no debe aparecer
    expect(
      within(screen.getByRole('status', { name: 'display' }))
        .getByText('123456789')
    ).toBeInTheDocument()
  })

  it('no permite más de 9 caracteres incluyendo el signo menos', () => {
    render(<Calculator />)
    clickButton('-')
    clickButton('1')
    clickButton('2')
    clickButton('3')
    clickButton('4')
    clickButton('5')
    clickButton('6')
    clickButton('7')
    clickButton('8')
    clickButton('9') // Este no debe aparecer
    expect(
      within(screen.getByRole('status', { name: 'display' }))
        .getByText('-12345678')
    ).toBeInTheDocument()
  })

  it('no permite más de 9 caracteres incluyendo el punto decimal', () => {
    render(<Calculator />)
    clickButton('1')
    clickButton('.')
    clickButton('2')
    clickButton('3')
    clickButton('4')
    clickButton('5')
    clickButton('6')
    clickButton('7')
    clickButton('8')
    clickButton('9') // Este no debe aparecer
    expect(
      within(screen.getByRole('status', { name: 'display' }))
        .getByText('1.2345678')
    ).toBeInTheDocument()
  })
})
