import React from 'react'
import { DraggableAndDroppablePokemons } from '../types'
import ElementDragAndDrop from './ElementDragAndDrop'
interface Props {
  pokemons: DraggableAndDroppablePokemons
  score: number
  maxDragggableElements: number
  resetGame: () => void
}

const DraggableElements: React.FC<Props> = ({
  pokemons,
  score,
  maxDragggableElements,
  resetGame,
}) => {
  return (
    <div className='flex flex-wrap justify-around gap-2.5 h-min p-6'>
      {score === maxDragggableElements ? (
        <div className='flex flex-col justify-center items-center'>
          <p className='text-white text-lg text-center mb-4'>Ganaste!!!</p>
          <button
            className='h-10 px-6 font-semibold rounded-md bg-black text-white'
            onClick={() => resetGame()}
          >
            Restart
          </button>
        </div>
      ) : (
        <>
          {Array.from(pokemons.entries()).map(([id, pokemon]) => (
            <ElementDragAndDrop key={id} pokemon={pokemon} />
          ))}
        </>
      )}
    </div>
  )
}

export default DraggableElements
