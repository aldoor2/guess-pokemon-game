import React from 'react'
import { DraggableAndDroppablePokemons } from '../types'
import { generateRandomNumber } from '../utils'
import ElementDragAndDrop from './ElementDragAndDrop'

interface Props {
  pokemons: DraggableAndDroppablePokemons
}

let numberRandom = generateRandomNumber()

const DroppableElements: React.FC<Props> = ({ pokemons }) => {
  React.useEffect(() => {
    numberRandom = generateRandomNumber()
  }, [])

  return (
    <div className='flex flex-wrap justify-around gap-2.5 h-min p-6'>
      {Array.from(pokemons.entries())
        .map(([id, pokemon]) => (
          <ElementDragAndDrop key={id} onlyName pokemon={pokemon} />
        ))
        .sort(() => numberRandom)}
    </div>
  )
}
export default DroppableElements
