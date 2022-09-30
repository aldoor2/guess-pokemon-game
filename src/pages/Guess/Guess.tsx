import * as React from 'react'

import { useGuess } from '../../context/GuessContext'
import { DraggableElements, DroppableElements } from './components'

function Guess() {
  const [
    { pokemons, score, isElementDroppedIncorrect },
    { getAllPokemonFirstGeneration },
  ] = useGuess()

  React.useEffect(() => {
    getAllPokemonFirstGeneration()
  }, [])

  return (
    <>
      <h1 className='text-center text-2xl'>Adivina el pokemon!</h1>
      <DraggableElements pokemons={pokemons} score={score} />

      <h2 className='text-center text-xl'>Arrastra y suelta</h2>
      {isElementDroppedIncorrect && (
        <p className='text-white text-lg text-center'>Ups!</p>
      )}
      <DroppableElements pokemons={pokemons} />
    </>
  )
}
export default Guess
