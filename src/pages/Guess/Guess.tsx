import * as React from 'react'

import { useGuess } from '../../context/GuessContext'
import { DraggableElements, DroppableElements } from './components'

function Guess() {
  const [
    { pokemons, score, failedElementDropped, maxDragAndDropElements },
    { getAllPokemonFirstGeneration, resetGame },
  ] = useGuess()

  React.useEffect(() => {
    getAllPokemonFirstGeneration()
  }, [])

  return (
    <>
      <h1 className='text-center text-2xl'>Adivina el pokemon!</h1>
      <DraggableElements
        pokemons={pokemons}
        score={score}
        maxDragggableElements={maxDragAndDropElements}
        resetGame={resetGame}
      />

      <h2 className='text-center text-xl'>Arrastra y suelta</h2>
      {failedElementDropped && (
        <p className='text-white text-lg text-center'>Ups!</p>
      )}
      <DroppableElements pokemons={pokemons} />
    </>
  )
}
export default Guess
