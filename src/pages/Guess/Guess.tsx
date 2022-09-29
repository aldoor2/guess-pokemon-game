import { DraggableElements, DroppableElements } from './components'

function Guess() {
  return (
    <>
      <h1 className='text-center'>Adivina el pokemon!</h1>
      <DraggableElements />
      <h2 className='text-center'>Arrastra y suelta</h2>
      <DroppableElements />
    </>
  )
}
export default Guess
