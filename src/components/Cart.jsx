import React, { useEffect, useState } from "react"
import axios from "axios"
import Navbar from './navbar'
import { useNavigate } from "react-router-dom"

function CartPage() {
  let [data, setData] = useState([])
  let navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:4000/cart')
      .then(res => setData(res.data))
      .catch(err => console.error(err))
  }, [])

  function remove(item) {
    axios
      .delete(`http://localhost:4000/cart/${item.id}`)
      .then(() => {
        setData((prev) => prev.filter((e) => e.id !== item.id))
      })
      .catch(err => {
        console.error(err)
      })
  }

  let data1 = data.filter((e) => {
    return e.userid == localStorage.getItem("id")
  })

  const checkout = data1.reduce((acc, item) => acc + item.price * item.quantity, 0)

  function count(item, update) {
    if (update < 1) return

    axios.patch(`http://localhost:4000/cart/${item.id}`, { quantity: update })
      .then(() => {
        setData(prev =>
          prev.map(e => (e.id === item.id ? { ...e, quantity: update } : e))
        )
      })
      .catch(err => console.error(err));
  }

  function hello() {
    navigate('/checkout')
  }

  return (
    <>
      <Navbar />
      <div style={{ margin: "100px 0px 0px 0px" }}>
        {data1.length === 0 ? (
          <div >
            <h2>Your cart is empty</h2>
            <p>Add something to your cart!</p>
          </div>
        ) : (
          data1.map((e, i) => {
            return (
              <div
                key={i}
                style={{
                  height: "140px",
                  width: "90%",
                  boxShadow: "10px 4px 12px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  margin: "40px auto",
                  borderRadius: "10px",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <img
                  src={e.image}
                  alt={e.title}
                  style={{
                    height: "120px",
                    width: "200px",
                    margin: "10px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "10px 30px",
                    flexGrow: 1,
                    justifyContent: "center",
                  }}
                >
                  <h3 style={{ margin: "0 0 5px 0" }}>
                    {e.title}, <span style={{ fontStyle: "italic", color: "#555" }}>{e.brand}</span>
                  </h3>
                  <p style={{ margin: "2px 0" }}>
                    Price: <strong>${e.price}</strong>
                  </p>
                  <p style={{ margin: "2px 0" }}>
                    Quantity: <strong>{e.quantity}</strong>
                  </p>
                  <p style={{ margin: "2px 0" }}>
                    Subtotal: <strong>${e.price * e.quantity}</strong>
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "5px" }}>
                  <button
                    style={{
                      padding: "2px 8px",
                      cursor: "pointer",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      backgroundColor: "#f0f0f0",
                    }}
                    onClick={() => count(e, e.quantity - 1)} >
                    -
                  </button>
                  <input
                    type="text"
                    min="1"
                    value={e.quantity}
                    style={{
                      width: "30px",
                      textAlign: "center",
                      padding: "4px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                    readOnly
                  />
                  <button
                    style={{
                      padding: "2px 8px",
                      cursor: "pointer",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      backgroundColor: "#fcfbfbff",

                    }} onClick={() => count(e, e.quantity + 1)}>
                    +
                  </button>
                </div>

                <button
                  style={{
                    height: "40px",
                    padding: "0 15px",
                    backgroundColor: "#e74c3c",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    alignSelf: "center",
                    marginLeft: "40px"
                  }} onClick={() => remove(e)} >
                  Remove
                </button>
              </div>
            );
          })
        )}
      </div>
      {data1.length > 0 && <div style={{ display: "flex", flexDirection: "column", alignItems: 'flex-end', margin: "30px 120px 20px 0px" }}>

        <h1> Total amount: ${checkout}</h1>

        <button style={{
          padding: "10px 25px",
          backgroundColor: "#fdfbfbff",
          color: "white",
          border: "none",
          width: "150px",
          borderRadius: "6px",
          color: "black", boxShadow: "10px 4px 12px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          fontSize: "16px"
        }} onClick={hello}>Pay now</button>
      </div>}

    </>

  )
}

export default CartPage;
