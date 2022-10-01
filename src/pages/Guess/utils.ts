import { PokemonItem } from './types'

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

/**
 * Getting a Pokemon by Id or Name
 * @param pokemonId Id of pokemon to get
 * @returns Object type PokemonItem
 */
export const getPokemonById = async (
  pokemonId: number | string
): Promise<PokemonItem> => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    const data = await res.json()

    const pokemon: PokemonItem = {
      id: data.id,
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default,
    }

    return pokemon
  } catch (error) {
    return { id: '', name: '', image: '' } as PokemonItem
  }
}
