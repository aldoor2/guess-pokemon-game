import GuessProvider from '../../context/GuessContext'
import { DraggableElements, DroppableElements } from './components'

function Guess() {
  return (
    <GuessProvider>
      <h1 className='text-center text-2xl'>Adivina el pokemon!</h1>
      <DraggableElements />
      <h2 className='text-center text-xl'>Arrastra y suelta</h2>
      <DroppableElements />
    </GuessProvider>
  )
}
export default Guess
