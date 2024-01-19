import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx';
import Homes from './pages/Homes.jsx'
import PixelBoard from './pages/PixelBoard.jsx';

const App = () => {
  return (
    <Router>
        <Routes>
            <Route path='/home' element={<Homes />}/>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/pixel' element={<PixelBoard />}/>
        </Routes>
    </Router>
  )
}

export default App