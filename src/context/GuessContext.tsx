import * as React from 'react'
import { getPokemonByIdRequest } from '../api'
import {
  generateRandomPokemonId,
  PokemonItem,
  DraggableAndDroppablePokemons,
} from '../pages/Guess'

type Props = {
  children: JSX.Element | JSX.Element[]
}
interface Context {
  state: {
    pokemons: DraggableAndDroppablePokemons
    score: number
    failedElementDropped: boolean
    maxDragAndDropElements: number
  }
  actions: {
    getAllPokemonFirstGeneration: () => void
    addElementDropped: (value: PokemonItem) => void
    clearElementsDropped: () => void
    setFailedElementDropped: (value: boolean) => void
    isElementDropped: (pokemonId: number) => boolean
  }
}

const initialState = {
  pokemons: () => new Map(),
  elementsDropped: () => new Map(),
  maxDragAndDropElements: 10,
  failedElementDropped: false,
}

const GuessContext = React.createContext({} as Context)

const GuessProvider: React.FC<Props> = ({ children }) => {
  const [pokemons, setPokemons] = React.useState<DraggableAndDroppablePokemons>(
    () => initialState.pokemons()
  )
  const [elementsDropped, setElementsDropped] =
    React.useState<DraggableAndDroppablePokemons>(() =>
      initialState.elementsDropped()
    )
  const [maxDragAndDropElements, setMaxDragAndDropElements] = React.useState(
    initialState.maxDragAndDropElements
  )
  const [failedElementDropped, setFailedElementDropped] = React.useState(
    initialState.failedElementDropped
  )

  // Score of game to Drop successfully
  const score = React.useMemo(() => elementsDropped.size, [elementsDropped])

  /**
   * Gettting All First Generation of Pokemons
   */
  const getAllPokemonFirstGeneration = React.useCallback(async () => {
    const foundPokemons: DraggableAndDroppablePokemons = new Map()

    while (foundPokemons.size < maxDragAndDropElements) {
      const pokemonId = generateRandomPokemonId()
      const pokemon = await getPokemonByIdRequest(pokemonId)
      foundPokemons.set(pokemonId, pokemon)
    }

    setPokemons(new Map(foundPokemons))
  }, [pokemons, maxDragAndDropElements])

  /**
   * Add a element dropped
   */
  const addElementDropped = React.useCallback(
    (elementDropped: PokemonItem) => {
      elementsDropped.set(elementDropped.id, elementDropped)

      setElementsDropped(new Map(elementsDropped))
    },
    [elementsDropped]
  )

  /**
   * Clear all elements dropped
   */
  const clearElementsDropped = React.useCallback(() => {
    elementsDropped.clear()

    setElementsDropped(new Map(elementsDropped))
  }, [elementsDropped])

  /**
   * Determines whether an array includes a certain element,
   * returning true or false as appropriate.
   */
  const isElementDropped = React.useCallback(
    (pokemonId: number): boolean => elementsDropped.has(pokemonId),
    [elementsDropped]
  )

  // State global variables
  const state = React.useMemo(
    () => ({
      pokemons,
      score,
      failedElementDropped,
      maxDragAndDropElements,
    }),
    [pokemons, score, failedElementDropped, maxDragAndDropElements]
  )

  // Actions accepted for handle the state
  const actions = React.useMemo(
    () => ({
      getAllPokemonFirstGeneration,
      addElementDropped,
      clearElementsDropped,
      setFailedElementDropped,
      isElementDropped,
    }),
    [
      getAllPokemonFirstGeneration,
      addElementDropped,
      clearElementsDropped,
      setFailedElementDropped,
      isElementDropped,
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
