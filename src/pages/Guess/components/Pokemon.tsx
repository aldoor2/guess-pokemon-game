import React from 'react'

import reactLogo from '../../../assets/react.svg'

interface Props {
  onlyName?: boolean
}

const Pokemon: React.FC<Props> = ({ onlyName }) => {
  if (onlyName) {
    return (
      <div>
        <div className='border-4 border-dashed border-amber-900 min-w-min w-28 h-28 px-2.5 grid place-content-center'>
          <p>Name</p>
        </div>
      </div>
    )
  }

  return (
    <div className='pokemon'>
      <img src={reactLogo} alt='' className='w-32' />
    </div>
  )
}
export default Pokemon
