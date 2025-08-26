import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './assets/Signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './assets/Login'
import Home from './assets/Home'
import Pay from './assets/Pay'
import Paydone from './assets/Paydone'
import CartDeets from './assets/CartDeets'

const App = () => {
  const backgroundImage = '/src/assets/bg.png';

  return (
    <div 
      style={{
        backgroundColor: 'black',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        width: '100%',
    }}
    >
      <BrowserRouter>.
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path= '/register' element={<Signup />}></Route>
          <Route path= '/login' element={<Login />}></Route>
          <Route path= '/home' element={<Home />}></Route>
          <Route path= '/pay' element={<Pay />}></Route>
          <Route path= '/cartdeets' element={<CartDeets />}></Route>
          <Route path= '/paydone' element={<Paydone />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App