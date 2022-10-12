import { useEffect, lazy, Suspense } from 'react'

import { useGuess } from '@/context/GuessContext'

const DraggableElementsLazy = lazy(
  () => import('./components/DraggableElements')
)
const DroppableElementsLazy = lazy(
  () => import('./components/DroppableElements')
)

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

  useEffect(() => {
    startGame()
  }, [])

  return (
    <>
      <h1 className='text-center text-2xl'>Adivina el pokemon!</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <DraggableElementsLazy
          pokemons={pokemons}
          score={score}
          maxDragggableElements={maxDragAndDropElements}
          resetGame={startGame}
        />
      </Suspense>

      <h2 className='text-center text-xl'>Arrastra y suelta</h2>
      {failedElementDropped && (
        <p className='text-white text-lg text-center'>Ups!</p>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <DroppableElementsLazy pokemons={pokemons} />
      </Suspense>
    </>
  )
}
export default Guess
