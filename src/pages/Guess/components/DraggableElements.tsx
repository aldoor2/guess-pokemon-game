import Pokemon from './Pokemon'

function DraggableElements() {
  return (
    <div className='border-2 border-black flex justify-around gap-2.5 min-h-60 h-60 p-6'>
      <Pokemon />
      <Pokemon />
      <Pokemon />
    </div>
  )
}

export default DraggableElements
