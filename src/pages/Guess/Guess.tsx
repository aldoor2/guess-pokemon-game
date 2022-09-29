function Guess() {
  return (
    <>
      <h1>Adivina el pokemon</h1>
      <div className='draggable_elements'>
        <div className='pokemon'>
          <img src='assets/react.svg' alt='' />
        </div>
        <div className='pokemon'>
          <img src='assets/react.svg' alt='' />
        </div>
        <div className='pokemon'>
          <img src='assets/react.svg' alt='' />
        </div>
      </div>
      <h2>Arrastra y suelta</h2>
      <div className='droppable_elements'></div>
    </>
  )
}
export default Guess
