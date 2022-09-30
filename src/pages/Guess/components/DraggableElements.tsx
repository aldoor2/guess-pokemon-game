import React from 'react'
import { PokemonItem } from '../types'
import ElementDragAndDrop from './ElementDragAndDrop'

interface Props {
  pokemons: PokemonItem[]
}

const DraggableElements: React.FC<Props> = ({ pokemons }) => {
  return (
    <div className='flex justify-around gap-2.5 h-52 p-6'>
      {pokemons.map((pokemon) => (
        <ElementDragAndDrop key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}

export default DraggableElements
