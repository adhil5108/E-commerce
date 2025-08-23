import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/Footer'

function Userprofile() { 
    let [user,setuser]=useState({})
    let [order,setorder]=useState([])
    let {id}=useParams()
  
     useEffect(()=>{
     axios.get(`http://localhost:4000/users/${id}`)
     .then(res=>setuser(res.data))
     .catch(err=>console.error(err))

          axios.get(`http://localhost:4000/orders`)
     .then(res=>setorder(res.data))
     .catch(err=>console.error(err))

     },[])


     let data=order.filter((e)=>e.userid===user.id)

   function block(user){
    if(user.status==="blocked"){ axios.patch(`http://localhost:4000/users/${id}`,{status:"active"})
    .then(res=>setuser(res.data))
    .catch(err=>console.error(err))}

   else if(user.status==="active"){ axios.patch(`http://localhost:4000/users/${id}`,{status:"blocked"})
    .then(res=>setuser(res.data))
    .catch(err=>console.error(err))}
   }
   

  return (
    <>  
    <Navbar/>
     <div style={{ marginTop: "150px" }}>
        <div
          style={{
            maxWidth: '400px',

            margin: '2rem auto',
            padding: '1.5rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            backgroundColor: '#fafafa',
          }}>
          <h2
            style={{
              textAlign: 'center',
              marginBottom: '1rem',
              color: '#333',
            }}>
           user Profile
          </h2>

          {(user) && (
            <div
              style={{
                lineHeight: '1.6',
                fontSize: '1.1rem',
              }} >
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email }
              </p>
              <p>
                <strong>Age:</strong> {user.age }
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>

               <p>
                <strong>status:</strong> {user.status }
              </p>
            </div>
          )}

          <button
           
            style={{
              marginTop: '1.5rem',
              width: '30%',
              padding: '0.75rem',
              backgroundColor: '#fdfdfdff',
              color: '#111111ff',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              margin: '1.5rem 130px'

            }} onClick={()=>block(user)} >
         {user.status==="blocked"?'unblock':'block'}
          </button>
        </div>
      </div>

      <div style={{ marginTop: "60px", maxWidth: "900px", marginInline: "auto", padding: "0 15px" }}>
        <h1 style={{
          marginBottom: "20px",
          borderBottom: "2px solid #ddd",
          paddingBottom: "5px",
          fontSize: "24px",
          color: "#333"
        }}>
          Previous Orders
        </h1>

        {data.length === 0 ? (
          <p style={{
            color: "#777",
            fontSize: "16px",
            textAlign: "center",
            padding: "30px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
          }}>
            No previous orders found.
          </p>
        ) : (
          data.reverse().map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "20px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                cursor: "pointer"
              }}

            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", color: "#666" }}>
                <span><strong>product ID:</strong> {item.id}</span>
                <span style={{ fontSize: "13px" }}> Placed on: 16/7/2025</span>
              </div>

              <h4 style={{ fontSize: "18px", color: "#222", marginBottom: "5px" }}>{item.title}</h4>

              <div style={{ fontSize: "14px", color: "#777", marginBottom: "8px" }}>
                Quantity: <strong>{item.quantity}</strong>
              </div>

              <div style={{ fontWeight: "bold", fontSize: "16px", color: "#2a9d8f" }}>
                Total: ${item.price * item.quantity}
              </div>
            </div>
          ))
        )}
      </div>
    
      </>
  )
}

export default Userprofile