import React from 'react'
import { DraggableAndDroppablePokemons } from '../types'
import { generateAllRandomNumbersOfMap } from '../utils'
import ElementDragAndDrop from './ElementDragAndDrop'

interface Props {
  pokemons: DraggableAndDroppablePokemons
}

const DroppableElements: React.FC<Props> = ({ pokemons }) => {
  const [randomNumbers, setRandomNumbers] = React.useState(
    new Map<number, number>()
  )

  const getNumbersRandom = async () => {
    const numbers = await generateAllRandomNumbersOfMap(pokemons)
    setRandomNumbers(numbers)
  }

  React.useEffect(() => {
    ;(async () => {
      await getNumbersRandom()
    })()
  }, [pokemons])

  return (
    <div className='flex flex-wrap justify-around gap-2.5 min-h-min p-6'>
      {Array.from(pokemons.values())
        .sort((a, b) => randomNumbers.get(a.id) as number)
        .map((pokemon) => (
          <ElementDragAndDrop key={pokemon.id} onlyName pokemon={pokemon} />
        ))}
    </div>
  )
}
export default DroppableElements
