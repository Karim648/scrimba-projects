import { useState } from 'react'
import './App.css'
import { Quiz } from './components/Quiz';

export function App() {
const [start, setStart] = useState(false);

  return (
    <>
      {start ? 
          <Quiz /> :
        <section className="start-screen">
          <h1>Quizzical</h1>
          <button onClick={() => setStart(true)}>Start Quiz!</button>
        </section> 
      }
    </>
  )
}

