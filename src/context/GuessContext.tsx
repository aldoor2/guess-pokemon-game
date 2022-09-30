import * as React from 'react'
import { PokemonItem } from '../pages/Guess'

type Props = {
  children: JSX.Element | JSX.Element[]
}

interface Context {
  state: {
    pokemons: PokemonItem[]
    score: number
    isElementDroppedIncorrect: boolean
  }
  actions: {
    getPokemonById: (pokemonId: number | string) => void
    getAllPokemonFirstGeneration: () => void
    addElementDropped: (namePokemon: PokemonItem['name']) => void
    clearElementsDropped: () => void
    setIsElementDroppedIncorrect: (value: boolean) => void
  }
}

const GuessContext = React.createContext({} as Context)

const GuessProvider: React.FC<Props> = ({ children }) => {
  const [pokemons, setPokemons] = React.useState<PokemonItem[]>([])
  const [elementsDropped, setElementsDropped] = React.useState<
    PokemonItem['name'][]
  >([])
  const [totalElementsDraggable, setTotalElementsDraggable] = React.useState(3)
  const [isElementDroppedIncorrect, setIsElementDroppedIncorrect] =
    React.useState(false)

  // Score of game to Drop successfully
  const score = React.useMemo(() => elementsDropped.length, [elementsDropped])

  /**
   * Get a random number
   */
  const randomId = React.useCallback(
    (max: number) => Math.floor(Math.random() * max) + 1,
    []
  )

  /**
   * Getting a Pokemon by Id or Name
   */
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

  /**
   * Gettting All First Generation of Pokemons
   */
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

  /**
   * Add a element dropped
   */
  const addElementDropped = React.useCallback(
    (namePokemon: PokemonItem['name']) => {
      setElementsDropped([...elementsDropped, namePokemon])
    },
    [elementsDropped]
  )

  /**
   * Clear all elements dropped
   */
  const clearElementsDropped = React.useCallback(() => {
    setElementsDropped([])
  }, [elementsDropped])

  // State global variables
  const state = React.useMemo(
    () => ({ pokemons, score, isElementDroppedIncorrect }),
    [pokemons, score, isElementDroppedIncorrect]
  )

  // Actions accepted for handle the state
  const actions = React.useMemo(
    () => ({
      getPokemonById,
      getAllPokemonFirstGeneration,
      addElementDropped,
      clearElementsDropped,
      setIsElementDroppedIncorrect,
    }),
    [
      getPokemonById,
      getAllPokemonFirstGeneration,
      addElementDropped,
      clearElementsDropped,
      setIsElementDroppedIncorrect,
    ]
  )

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
