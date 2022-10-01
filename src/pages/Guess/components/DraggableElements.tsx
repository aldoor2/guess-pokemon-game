import React from 'react'
import { PokemonItem } from '../types'
import ElementDragAndDrop from './ElementDragAndDrop'
interface Props {
  pokemons: PokemonItem[]
  score: number
}

const DraggableElements: React.FC<Props> = ({ pokemons, score }) => {
  return (
    <div className='flex flex-wrap justify-around gap-2.5 h-min p-6'>
      {score === pokemons.length && score > 0 ? (
        <p className='text-white text-lg text-center h-16 p-16'>Ganaste!!!</p>
      ) : (
        <>
          {/* <p className='text-sm text-white'>{`Score: ${score}`}</p> */}
          {pokemons.map((pokemon) => (
            <ElementDragAndDrop key={pokemon.id} pokemon={pokemon} />
          ))}
        </>
      )}
    </div>
  )
}

export default DraggableElements
