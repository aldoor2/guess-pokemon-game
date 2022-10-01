import * as React from 'react'
import {
  generateRandomPokemonId,
  getPokemonById,
  PokemonItem,
} from '../pages/Guess'

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
  const [maxDragAndDropElements, setMaxDragAndDropElements] = React.useState(10)
  const [isElementDroppedIncorrect, setIsElementDroppedIncorrect] =
    React.useState(false)

  // Score of game to Drop successfully
  const score = React.useMemo(() => elementsDropped.length, [elementsDropped])

  /**
   * Gettting All First Generation of Pokemons
   */
  const getAllPokemonFirstGeneration = React.useCallback(async () => {
    const searchPokemons: PokemonItem[] = []
    const pokemonsIdToSearch = new Set<number>()

    // Generate Pokemon IDs uniques to be get the data from api
    while (pokemonsIdToSearch.size < maxDragAndDropElements) {
      const pokemonId = generateRandomPokemonId()
      pokemonsIdToSearch.add(pokemonId)
    }

    // We get the pokemon data for drag and drop
    for (const pokemonId of pokemonsIdToSearch) {
      const pokemon = await getPokemonById(pokemonId)
      searchPokemons.push(pokemon)
    }

    // Modifycate el state global
    setPokemons([...searchPokemons])
  }, [pokemons, maxDragAndDropElements])

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
      getAllPokemonFirstGeneration,
      addElementDropped,
      clearElementsDropped,
      setIsElementDroppedIncorrect,
    }),
    [
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
