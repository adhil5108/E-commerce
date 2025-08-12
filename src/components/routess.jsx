import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './Register'
import Login from './login'
import Home from './Home'
import About from './about'
import Allcollections from './Allcollections'
import Brands from './Brands'
import Productinfo from './Productinfo'
import Profile from './Profile'
import CartPage from './Cart'
import Checkout from './Checkout'
function Routess() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/allcollection' element={<Allcollections />} />
        <Route path='/allcollection/:productid' element={<Productinfo />} />
        <Route path='/brands' element={<Brands />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </>
  )
}

export default Routess