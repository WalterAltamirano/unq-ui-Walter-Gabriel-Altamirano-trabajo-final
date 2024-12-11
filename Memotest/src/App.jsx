import './App.css'
import Memotest from './components/memotest/Memotest'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const App = () =>  {

  return (
    <>
    {/*Esto es inecesario para el funcionamiento pero puede servir para futuras versiones...*/}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Memotest />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
