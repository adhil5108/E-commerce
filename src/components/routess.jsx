import React  from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
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
import Users from '../admin/Users'
import Userprofile from '../admin/Userprofile'
import Products from '../admin/Products'
import Orders from '../admin/Orders'
import Displaypro from '../admin/Displaypro'
import Edit from '../admin/edit'

function Routess() {
let user={role:localStorage.getItem("role")}

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={!localStorage.getItem("id")? <Register /> :<Navigate to={'/'}/>}  />
        <Route path='/login' element={!localStorage.getItem("id")? <Login />:<Navigate to={'/'}/>} />
        <Route path='/about' element={user?.role === "user"||user?.role ===null?<About />:<Notfound/>} />
        <Route path='/allcollection' element={user?.role === "user"||user?.role ===null?<Allcollections />:<Notfound/>} />
        <Route path='/allcollection/:productid' element={user?.role === "user"||user?.role ===null?<Productinfo />:<Notfound/>} />
        <Route path='/brands' element={user?.role === "user"||user?.role ===null?<Brands />:<Notfound/>} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cart' element={user?.role === "user" ? <CartPage /> : <Notfound />} />
        <Route path='/checkout' element={user?.role === "user" ? <Checkout /> : <Notfound />} />
        <Route path='/success' element={user?.role === "user" ? <Success /> : <Notfound />} />
        <Route path='/wishlist' element={user?.role === "user" ? <Wishlist /> : <Notfound />} />
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