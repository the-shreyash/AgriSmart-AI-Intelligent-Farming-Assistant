import { useState } from 'react'

import 

import './App.css'
import { Contact } from 'lucide-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Home/>
    <About/>
    <Contact/>

    </>
  )
}

export default App
