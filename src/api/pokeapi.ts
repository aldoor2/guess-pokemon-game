import { PokemonItem } from '@/pages'

/**
 * Getting a Pokemon by Id or Name
 * @param pokemonId Id or Name of pokemon to get
 * @returns Object type PokemonItem
 */
export const getOnePokemonRequest = async (
  pokemonId: number | string
): Promise<PokemonItem> => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    const data = await res.json()

    return {
      id: data.id,
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default,
    } as PokemonItem
  } catch (error) {
    return { id: 0, name: '', image: '' } as PokemonItem
  }
}
