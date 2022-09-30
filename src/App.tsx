import './App.css'
import GuessProvider from './context/GuessContext'
import { Guess } from './pages/Guess'

function App() {
  return (
    <main className='w-11/12 my-12 mx-auto flex flex-col gap-6'>
      <GuessProvider>
        <Guess />
      </GuessProvider>
    </main>
  )
}

export default App
