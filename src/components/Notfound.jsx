import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './navbar'
import Footer from './Footer'
function Notfound() {
    let navigate=useNavigate()
  return (
      <>
    <Navbar/>
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f9f9f9",
      textAlign: "center"
    }}>
      <h1 style={{ fontSize: "60px", color: "black" }}>ERROR-404</h1>
      <p style={{ fontSize: "18px", marginTop: "10px" }}>
      The page you are looking for doesnt exist
      </p>
      <button
        style={{
          marginTop: "20px",
          padding: "12px 25px",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px"
        }}
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
    <Footer/>
    </>
  )
}

export default Notfound