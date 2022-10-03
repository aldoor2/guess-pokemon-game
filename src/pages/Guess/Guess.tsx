import * as React from 'react'

import { useGuess } from '../../context/GuessContext'
import { DraggableElements, DroppableElements } from './components'

function Guess() {
  const [
    { pokemons, score, failedElementDropped, maxDragAndDropElements },
    { getAllPokemonFirstGeneration, clearElementsDropped },
  ] = useGuess()

  /**
   * Start the game
   */
  const startGame = () => {
    clearElementsDropped()
    getAllPokemonFirstGeneration()
  }

  React.useEffect(() => {
    startGame()
  }, [])

  return (
    <>
      <h1 className='text-center text-2xl'>Adivina el pokemon!</h1>
      <DraggableElements
        pokemons={pokemons}
        score={score}
        maxDragggableElements={maxDragAndDropElements}
        resetGame={startGame}
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
