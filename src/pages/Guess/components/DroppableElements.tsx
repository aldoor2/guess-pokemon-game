import React from 'react'
import { PokemonItem } from '../types'
import { generateRandomNumber } from '../utils'
import ElementDragAndDrop from './ElementDragAndDrop'

interface Props {
  pokemons: PokemonItem[]
}

let numberRandom = generateRandomNumber()

const DroppableElements: React.FC<Props> = ({ pokemons }) => {
  React.useEffect(() => {
    numberRandom = generateRandomNumber()
  }, [])

  return (
    <div className='flex flex-wrap justify-around gap-2.5 h-min p-6'>
      {pokemons
        .map((p) => <ElementDragAndDrop key={p.id} onlyName pokemon={p} />)
        .sort(() => numberRandom)}
    </div>
  )
}
export default DroppableElements
