import React from 'react'
import { Pokemon } from '../types'

interface Props {
  onlyName?: boolean
  pokemon: Pokemon
}

const ElementDragAndDrop: React.FC<Props> = ({ onlyName, pokemon }) => {
  if (onlyName) {
    return (
      <div>
        <div className='border-4 border-dashed border-amber-900 w-fit h-24 px-2.5 grid place-content-center'>
          <p>{`${pokemon.name[0].toUpperCase()}${pokemon.name.substring(
            1
          )}`}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='pokemon'>
      <img src={pokemon.image} alt={pokemon.name} className='w-28 h-28' />
    </div>
  )
}
export default ElementDragAndDrop
