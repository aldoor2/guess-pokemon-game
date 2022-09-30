import * as React from 'react'
import { PokemonItem } from '../pages/Guess'

type Props = {
  children: JSX.Element | JSX.Element[]
}

interface Context {
  state: {
    pokemons: PokemonItem[]
  }
  actions: {
    getPokemonById: (pokemonId: number | string) => void
    getAllPokemonFirstGeneration: () => void
    changeTotalElementsDraggable: (value: number) => void
  }
}

const GuessContext = React.createContext({} as Context)

const GuessProvider: React.FC<Props> = ({ children }) => {
  const [pokemons, setPokemons] = React.useState<PokemonItem[]>([])
  const [totalElementsDraggable, setTotalElementsDraggable] = React.useState(3)

  const randomId = React.useCallback(
    (max: number) => Math.floor(Math.random() * max) + 1,
    []
  )

  const getPokemonById = React.useCallback(
    async (pokemonId: number | string) => {
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
    for (let i = 1; i <= totalElementsDraggable; i++) {
      const id = randomId(firstGeneration)
      const pokemon = await getPokemonById(id)
      searchPokemons.push(pokemon)
    }
    setPokemons([...searchPokemons])
  }, [pokemons])

  const changeTotalElementsDraggable = React.useCallback(
    (value: number) => setTotalElementsDraggable(value),
    [totalElementsDraggable]
  )

  const state = React.useMemo(() => ({ pokemons }), [pokemons])

  const actions = React.useMemo(
    () => ({
      getPokemonById,
      getAllPokemonFirstGeneration,
      changeTotalElementsDraggable,
    }),
    [getPokemonById, getAllPokemonFirstGeneration, changeTotalElementsDraggable]
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
