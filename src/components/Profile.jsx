import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './navbar'
import axios from 'axios'
import Footer from './Footer'

function Profile() {
  let [order, Setorder] = useState([])
     let [users, setusers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/orders')
      .then(res => Setorder(res.data))
      .catch(err => console.error(err))

       axios
      .get("http://localhost:4000/users")
      .then((response) => {
        setusers(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

 let user = users.find((e) => String(e.id) === String(localStorage.getItem("id")))

  let navigate = useNavigate()
  const name = localStorage.getItem('name')
  const email = localStorage.getItem('email')
  const age = localStorage.getItem('age')
  const phone = localStorage.getItem('phone')

  function logout() {
    localStorage.clear()
    navigate('/',{replace:true})
    window.location.reload()
  }

  let data = order.filter((or) => or.userid === localStorage.getItem("id"))

  return (
    <>
      <Navbar />
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
            Your Profile
          </h2>

          {(name) && (
            <div
              style={{
                lineHeight: '1.6',
                fontSize: '1.1rem',
              }} >
              <p>
                <strong>Name:</strong> {name || 'Not set'}
              </p>
              <p>
                <strong>Email:</strong> {email || 'Not set'}
              </p>
              <p>
                <strong>Age:</strong> {age || 'Not set'}
              </p>
              <p>
                <strong>Phone:</strong> {phone || 'Not set'}
              </p>
            </div>
          )}

          <button
            onClick={logout}
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

            }}>
            Log out
          </button>
        </div>
      </div>

      <div style={{ marginTop: "60px", maxWidth: "900px", marginInline: "auto", padding: "0 15px" ,display:user?.role==="admin"?"none":"block"}}>
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

      <Footer />
    </>
  )
}

export default Profile;
