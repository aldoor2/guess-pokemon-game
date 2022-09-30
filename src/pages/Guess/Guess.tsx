import * as React from 'react'

import { useGuess } from '../../context/GuessContext'
import { DraggableElements, DroppableElements } from './components'

function Guess() {
  const [{ pokemons, score }, { getAllPokemonFirstGeneration }] = useGuess()

  React.useEffect(() => {
    getAllPokemonFirstGeneration()
  }, [])

  return (
    <>
      <h1 className='text-center text-2xl'>Adivina el pokemon!</h1>
      {score === pokemons.length && score > 0 ? (
        <p className='text-white text-lg flex justify-center items-center h-52 p-6'>
          Congratulations!!!
        </p>
      ) : (
        <>
          <p className='text-sm text-white'>{`Score: ${score}`}</p>
          <DraggableElements pokemons={pokemons} />
        </>
      )}
      <h2 className='text-center text-xl'>Arrastra y suelta</h2>
      <DroppableElements pokemons={pokemons} />
    </>
  )
}
export default Guess
