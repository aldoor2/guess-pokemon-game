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
export const generateRandomNumber = (): number => Math.random() - 0.5
