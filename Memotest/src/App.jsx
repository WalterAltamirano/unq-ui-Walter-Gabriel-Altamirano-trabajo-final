import './App.css'
import Memotest from './components/memotest/Memotest'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const App = () =>  {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Memotest />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
