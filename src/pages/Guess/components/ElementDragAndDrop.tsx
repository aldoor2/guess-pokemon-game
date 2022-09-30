import React, { DragEvent, useState } from 'react'
import { useGuess } from '../../../context/GuessContext'
import { PokemonItem } from '../types'

interface Props {
  onlyName?: boolean
  pokemon: PokemonItem
}

const ElementDragAndDrop: React.FC<Props> = ({ onlyName, pokemon }) => {
  const [{}, { addElementDropped }] = useGuess()
  const [droppedSuccess, setDroppedSuccess] = useState(false)

  const handleDragStart = (e: DragEvent<HTMLImageElement>) => {
    e.dataTransfer.effectAllowed = 'copyLink'
    e.dataTransfer.setData('text/plain', pokemon.name)
  }

  const handleDragOver = (e: DragEvent<HTMLParagraphElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent<HTMLParagraphElement>) => {
    e.stopPropagation()

    const draggableElementData = e.dataTransfer.getData('text/plain')
    const isDropSuccess = pokemon.name === draggableElementData
    if (isDropSuccess) {
      addElementDropped(pokemon.name)
    }
    setDroppedSuccess(isDropSuccess)
  }

  if (onlyName) {
    return (
      <div
        className={`border-4 border-dashed border-amber-900 w-fit h-24 px-2.5 grid place-content-center`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {droppedSuccess ? (
          <img src={pokemon.image} alt={pokemon.name} className='w-24 h-24' />
        ) : (
          <p>{`${pokemon.name[0].toUpperCase()}${pokemon.name.substring(
            1
          )}`}</p>
        )}
      </div>
    )
  }

  return (
    <div className='pokemon'>
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className={`w-28 h-28 ${droppedSuccess && 'opacity-40'}`}
        draggable
        onDragStart={handleDragStart}
      />
    </div>
  )
}
export default ElementDragAndDrop
