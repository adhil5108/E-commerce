import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
function Dshboard() {
  
    let [users,setusers]=useState([])
    let [product,setproduct]=useState([])
    let [order,setorder]=useState([])

  useEffect(()=>{
  axios.get("http://localhost:4000/users")
  .then(res=>setusers(res.data))
  .catch(err=>console.error(err))

   axios.get("http://localhost:4000/products")
  .then(res=>setproduct(res.data))
  .catch(err=>console.error(err))

   axios.get("http://localhost:4000/orders")
  .then(res=>setorder(res.data))
  .catch(err=>console.error(err))
  },[])



let usercount=users.length
let productcount=product.length
let income=order.reduce((s,o)=>s+(o.quantity*o.price),0)

  return (
    <>
    <Navbar/>
    <div style={{marginTop:"150px"}}>
      <h3 style={{ marginLeft: "20px", fontSize: "40px", fontWeight: "500", fontFamily: "auto",flexWrap: 'wrap' }}>
        Welcome back { localStorage.getItem("name")}
      </h3>

    
      <div style={{ display: 'flex', gap: '20px', margin: '20px' }}>
        
        <div style={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#f0f4f8',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3>Users</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}> {usercount} </p>
        </div>
        <div style={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#fdf6e3',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3>Products</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}> {productcount} </p>
        </div>
        <div style={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#e3f6f5',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3>Total Income</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>$ {income} </p>
        </div>
        
      </div>
      </div>
    </>
  );
}

export default Dshboard;
