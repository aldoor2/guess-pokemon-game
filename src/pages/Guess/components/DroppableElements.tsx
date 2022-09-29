import React from 'react'
import { Pokemon } from '../types'
import ElementDragAndDrop from './ElementDragAndDrop'

interface Props {
  pokemons: Pokemon[]
}

const DroppableElements: React.FC<Props> = ({ pokemons }) => {
  return (
    <div className='border-2 border-black flex justify-around gap-2.5 min-h-60 h-60 p-6'>
      {pokemons
        .map((pokemon) => (
          <ElementDragAndDrop key={pokemon.id} onlyName pokemon={pokemon} />
        ))
        .sort(() => Math.random() - 0.5)}
    </div>
  )
}
export default DroppableElements
