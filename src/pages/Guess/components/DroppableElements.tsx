import Pokemon from './Pokemon'

function DroppableElements() {
  return (
    <div className='border-2 border-black flex justify-around gap-2.5 min-h-60 h-60 p-6'>
      <Pokemon onlyName />
      <Pokemon onlyName />
      <Pokemon onlyName />
    </div>
  )
}
export default DroppableElements
