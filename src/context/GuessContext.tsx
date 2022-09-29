import * as React from 'react'
import { PokemonItem } from '../pages/Guess'

type Props = {
  children: JSX.Element | JSX.Element[]
}

interface Context {
  state: {
    pokemons: PokemonItem[]
    totalCards: number
  }
  actions: {
    getPokemonById: (pokemonId: number) => void
    getAllPokemonFirstGeneration: () => void
  }
}

const GuessContext = React.createContext({} as Context)

const GuessProvider: React.FC<Props> = ({ children }) => {
  const [pokemons, setPokemons] = React.useState<PokemonItem[]>([])
  const totalCards = 3

  const randomId = React.useCallback(
    (max: number) => Math.floor(Math.random() * max) + 1,
    []
  )

  const getPokemonById = React.useCallback(
    async (pokemonId: number) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      const data = await res.json()

      const pokemon: PokemonItem = {
        id: data.id,
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
      }

      return pokemon
    },
    [pokemons]
  )

  const getAllPokemonFirstGeneration = React.useCallback(async () => {
    const firstGeneration = 151
    const searchPokemons: PokemonItem[] = []
    for (let i = 1; i <= totalCards; i++) {
      const id = randomId(firstGeneration)
      const pokemon = await getPokemonById(id)
      searchPokemons.push(pokemon)
    }
    setPokemons([...searchPokemons])
  }, [pokemons])

  const state = React.useMemo(
    () => ({ pokemons, totalCards }),
    [pokemons, totalCards]
  )

  const actions = React.useMemo(
    () => ({ getPokemonById, getAllPokemonFirstGeneration }),
    [randomId, getPokemonById, getAllPokemonFirstGeneration]
  )

  React.useEffect(() => {
    getAllPokemonFirstGeneration()
  }, [])

  return (
    <GuessContext.Provider value={{ state, actions }}>
      {children}
    </GuessContext.Provider>
  )
}

export function useGuess(): [Context['state'], Context['actions']] {
  const { state, actions } = React.useContext(GuessContext)

  return [state, actions]
}

export default GuessProvider
