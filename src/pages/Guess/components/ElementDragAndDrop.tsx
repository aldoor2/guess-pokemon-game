import React, { DragEvent, useState } from 'react'
import { useGuess } from '../../../context/GuessContext'
import { PokemonItem } from '../types'

interface Props {
  onlyName?: boolean
  pokemon: PokemonItem
}

const ElementDragAndDrop: React.FC<Props> = ({ onlyName, pokemon }) => {
  const [{}, { addElementDropped, setFailedElementDropped, isElementDropped }] =
    useGuess()
  const [droppedSuccess, setDroppedSuccess] = useState(false)

  const handleDragStart = (e: DragEvent<HTMLImageElement>) => {
    e.dataTransfer.effectAllowed = 'copyLink'
    e.dataTransfer.setData('text/plain', pokemon.name)
  }

  const handleDragEnd = (e: DragEvent<HTMLImageElement>) => {
    e.preventDefault()

    const isDroppped = isElementDropped(pokemon.id)
    setDroppedSuccess(isDroppped)

    e.stopPropagation()
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
      addElementDropped(pokemon)
      setFailedElementDropped(false)
    } else {
      setFailedElementDropped(true)
    }
    setDroppedSuccess(isDropSuccess)
  }

  React.useEffect(() => {
    const isDroppped = isElementDropped(pokemon.id)
    setDroppedSuccess(isDroppped)
  }, [pokemon])

  if (onlyName) {
    return (
      <div
        className={`border-4 ${
          !droppedSuccess
            ? 'border-dashed border-orange-700'
            : 'border-solid border-orange-800'
        } w-fit h-24 px-2.5 grid place-content-center`}
        onDragOver={(e) => (!droppedSuccess ? handleDragOver(e) : null)}
        onDrop={(e) => (!droppedSuccess ? handleDrop(e) : null)}
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
        className={`w-28 h-28 ${droppedSuccess ? 'opacity-0' : ''}`}
        draggable={!droppedSuccess}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      />
    </div>
  )
}
export default ElementDragAndDrop
