import React from 'react'
import { PokemonItem } from '../types'
import ElementDragAndDrop from './ElementDragAndDrop'

interface Props {
  pokemons: PokemonItem[]
}

let numberRandom = Math.random() - 0.5

const DroppableElements: React.FC<Props> = ({ pokemons }) => {
  React.useEffect(() => {
    numberRandom = Math.random() - 0.5
  }, [pokemons])

  return (
    <div className='flex flex-wrap justify-around gap-2.5 h-min p-6'>
      {pokemons
        .map((p) => <ElementDragAndDrop key={p.id} onlyName pokemon={p} />)
        .sort(() => numberRandom)}
    </div>
  )
}
export default DroppableElements
