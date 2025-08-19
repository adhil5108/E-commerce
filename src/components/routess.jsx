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
import Users from '../admin/Users'
import Userprofile from '../admin/Userprofile'
import Products from '../admin/Products'
import Orders from '../admin/Orders'
import Displaypro from '../admin/Displaypro'
import Edit from '../admin/edit'

function Routess() {

  let [users, setuser] = useState([])
  let [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("http://localhost:4000/users")
      .then(res => setuser(res.data))
      .catch(er => console.error(er))
      .finally(() => setLoading(false))
  }, [])

  let user = users.find((e) => String(e.id) === localStorage.getItem("id"))
  console.log(user?.role)
  if (loading) return <h1>Loading...</h1>

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
        <Route path='/cart' element={user?.role === "user" ? <CartPage />: <Notfound />} />
        <Route path='/checkout' element={user?.role === "user" ? <Checkout />: <Notfound />} />
        <Route path='/success' element={user?.role === "user" ? <Success />: <Notfound />} />
        <Route path='/wishlist' element={user?.role === "user" ? <Wishlist />: <Notfound />} />
        <Route path='/admin/dashboard' element={user?.role === "admin" ? <Dshboard /> : <Notfound />} />
        <Route path='/admin/users' element={user?.role === "admin" ? <Users /> : <Notfound />} />
        <Route path='/admin/users/:id' element={user?.role === "admin" ? <Userprofile /> : <Notfound />} />
        <Route path='/admin/products' element={user?.role === "admin" ? <Displaypro /> : <Notfound />} />
        <Route path='/admin/addproduct' element={user?.role === "admin" ? <Products /> : <Notfound />} />
        <Route path='/admin/orders' element={user?.role === "admin" ? <Orders /> : <Notfound />} />
         <Route path='/admin/product/:id' element={user?.role === "admin" ? <Edit /> : <Notfound />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </>
  )
}

export default Routess