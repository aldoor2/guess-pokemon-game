import React from 'react'
import { DraggableAndDroppablePokemons } from '../types'
import ElementDragAndDrop from './ElementDragAndDrop'
interface Props {
  pokemons: DraggableAndDroppablePokemons
  score: number
  maxDragggableElements: number
}

const DraggableElements: React.FC<Props> = ({
  pokemons,
  score,
  maxDragggableElements,
}) => {
  return (
    <div className='flex flex-wrap justify-around gap-2.5 h-min p-6'>
      {score === maxDragggableElements ? (
        <p className='text-white text-lg text-center h-16 p-16'>Ganaste!!!</p>
      ) : (
        <>
          {/* <p className='text-sm text-white'>{`Score: ${score}`}</p> */}
          {Array.from(pokemons.entries()).map(([id, pokemon]) => (
            <ElementDragAndDrop key={id} pokemon={pokemon} />
          ))}
        </>
      )}
    </div>
  )
}

export default DraggableElements
