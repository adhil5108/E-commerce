import React, { useEffect, useState } from 'react'
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
import Success from './Success'
import Wishlist from './Wishlist'
import Notfound from './Notfound'
import Dshboard from '../admin/Dshboard'
import axios from 'axios'
function Routess() {

   let [users,setuser]=useState([])
   useEffect(()=>{
axios.get("http://localhost:4000/users")
.then(res=>setuser(res.data))
.catch(er=>console.error(er))
   },[])

let user=users.find((e)=>String(e.id)===localStorage.getItem("id"))
console.log(user?.role)

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
        <Route path='/success' element={<Success />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route  path='/admin/dashboard'   element={ user?.role === "admin" ? <Dshboard /> :<Notfound />} />

        
          

        <Route path='*' element={<Notfound />} />

      </Routes>
    </>
  )
}

export default Routess