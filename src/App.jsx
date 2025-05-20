// src/App.jsx
import Calculator from './components/Calculator.jsx'

export default function App () {
  return (
    <div
      className='
        h-screen            /* móvil y desktop: altura de la ventana */
        bg-black
        flex flex-col       /* columna por defecto en móvil */
        sm:flex-row         /* row en desktop para centrar mejor */
        sm:items-center sm:justify-center
      '
    >
      <Calculator />
    </div>
  )
}
