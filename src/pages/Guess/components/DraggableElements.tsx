import React from 'react'
import { useGuess } from '../../../context/GuessContext'
import ElementDragAndDrop from './ElementDragAndDrop'

interface Props {}

const DraggableElements: React.FC<Props> = () => {
  const [{ pokemons }, {}] = useGuess()

  return (
    <div className='flex justify-around gap-2.5 min-h-60 h-60 p-6'>
      {pokemons.map((pokemon) => (
        <ElementDragAndDrop key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}

export default DraggableElements
