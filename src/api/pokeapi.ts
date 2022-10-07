import { PokemonItem } from '@/pages'

/**
 * Getting a Pokemon by Id or Name
 * @param pokemonId Id of pokemon to get
 * @returns Object type PokemonItem
 */
export const getPokemonByIdRequest = async (
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
    return { id: 0, name: '', image: '' } as PokemonItem
  }
}
