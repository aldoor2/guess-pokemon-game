import React from 'react'
import { useGuess } from '../../../context/GuessContext'
import ElementDragAndDrop from './ElementDragAndDrop'

interface Props {}

const DroppableElements: React.FC<Props> = () => {
  const [{ pokemons }, {}] = useGuess()

  return (
    <div className='flex justify-around gap-2.5 min-h-60 h-60 p-6'>
      {pokemons
        .map((pokemon) => (
          <ElementDragAndDrop key={pokemon.id} onlyName pokemon={pokemon} />
        ))
        .sort(() => Math.random() - 0.5)}
    </div>
  )
}
export default DroppableElements
