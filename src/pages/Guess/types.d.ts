export interface PokemonItem {
  id: number
  name: string
  image: string
}

export type DraggableAndDroppablePokemons = Map<number, PokemonItem> // List of elements drag and drop for store response fetch to api
