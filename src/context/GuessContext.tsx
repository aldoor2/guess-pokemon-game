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
    isElementDroppedIncorrect: boolean
    maxDragAndDropElements: number
  }
  actions: {
    getAllPokemonFirstGeneration: () => void
    addElementDropped: (value: PokemonItem) => void
    clearElementsDropped: () => void
    setIsElementDroppedIncorrect: (value: boolean) => void
    isElementDropped: (pokemonId: number) => boolean
  }
}

const GuessContext = React.createContext({} as Context)

const GuessProvider: React.FC<Props> = ({ children }) => {
  const [pokemons, setPokemons] = React.useState<DraggableAndDroppablePokemons>(
    () => new Map()
  )
  const [elementsDropped, setElementsDropped] =
    React.useState<DraggableAndDroppablePokemons>(() => new Map())
  const [maxDragAndDropElements, setMaxDragAndDropElements] = React.useState(10)
  const [isElementDroppedIncorrect, setIsElementDroppedIncorrect] =
    React.useState(false)

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
      isElementDroppedIncorrect,
      maxDragAndDropElements,
    }),
    [pokemons, score, isElementDroppedIncorrect, maxDragAndDropElements]
  )

  // Actions accepted for handle the state
  const actions = React.useMemo(
    () => ({
      getAllPokemonFirstGeneration,
      addElementDropped,
      clearElementsDropped,
      setIsElementDroppedIncorrect,
      isElementDropped,
    }),
    [
      getAllPokemonFirstGeneration,
      addElementDropped,
      clearElementsDropped,
      setIsElementDroppedIncorrect,
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
