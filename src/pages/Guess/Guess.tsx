import { useEffect, useState } from 'react'
import { DraggableElements, DroppableElements } from './components'
import { Pokemon } from './types'

function Guess() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  const getPokemonById = async (pokemonId: number): Promise<Pokemon> => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    const data = await res.json()
    return {
      id: data.id,
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default,
    }
  }

  const randomId = (max: number) => Math.floor(Math.random() * max) + 1

  const getAllPokemonFirstGeneration = async (max: number) => {
    const CARDS = 3
    let searchPokemons: Pokemon[] = []
    for (let i = 1; i <= CARDS; i++) {
      const id = randomId(max)
      const pokemon = await getPokemonById(id)
      searchPokemons.push(pokemon)
    }
    setPokemons(searchPokemons)
  }

  useEffect(() => {
    getAllPokemonFirstGeneration(151)
  }, [])

  return (
    <>
      <h1 className='text-center text-2xl'>Adivina el pokemon!</h1>
      <DraggableElements pokemons={pokemons} />
      <h2 className='text-center text-xl'>Arrastra y suelta</h2>
      <DroppableElements pokemons={pokemons} />
    </>
  )
}
export default Guess
