import { DraggableAndDroppablePokemons } from './types'

/**
 * Generate a random pokemon id
 * @param max Number maximum for generate random id
 * @returns A Pokemon Id from 1 to the maximum number indicated
 */
export const generateRandomPokemonId = (max: number = 151): number =>
  Math.floor(Math.random() * max) + 1

/**
 * Generate a random number
 * @returns A random number
 */
export const generateOneRandomNumber = (): number => Math.random() - 0.5

/**
 * Generate all random numbers of the items of map received by params
 * @param mapOrininal Map orifinal to generate random numbers
 * @returns A Promise<Map<number, number>>
 */
export const generateAllRandomNumbersOfMap = (
  mapOrininal: DraggableAndDroppablePokemons
) => {
  const randomNumbers = new Map<number, number>()
  Array.from(mapOrininal.values()).forEach((item) => {
    const randomNumber = generateOneRandomNumber()
    randomNumbers.set(item.id, randomNumber)
  })
  return new Promise<Map<number, number>>((resolve) => resolve(randomNumbers))
}
