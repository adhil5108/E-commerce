import React, { useState, useEffect } from 'react'
import Navbar from './navbar'
import Footer from './Footer'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

function Checkout() {
  let navigate = useNavigate()
  let [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/cart')
      .then(res => setData(res.data))
      .catch(err => console.error(err))
  }, []);

  let data1 = data.filter((e) => e.userid == localStorage.getItem("id"))

  let total = data1.reduce((s, i) => {
    return s + (i.price * (i.quantity))
  }, 0)

  let id = localStorage.getItem("id")
  function handlePlaceOrder() {
    data1.forEach((item) => {
      axios.post('http://localhost:4000/orders', item)
        .then(() => { axios.delete(`http://localhost:4000/cart/${item.id}`) })
        .catch(err => console.error(err))
    });

    setData([]);
    if (id) {
      toast.success("✅ Order placed successfully!", {
        position: "top-center",
        autoClose: 1500,
        onClose: () => navigate('/success')
      })
    }
    else { navigate('/login') }

  }

  return (
    <>
      <Navbar />
      <h1 style={{
        color: "black",
        marginTop: "160px",
        textAlign: "center",
        fontWeight: "300",
        fontFamily: "inherit",
        fontSize: "50px"
      }}>Checkout</h1>

      <div style={{
        width: "90%",
        margin: "50px auto",
        borderRadius: "20px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        padding: "30px"
      }}>
        {data1.map((ele) => (
          <div key={ele.id} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px",
            borderBottom: "1px solid #030303ff"
          }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={ele.image} alt="" style={{
                height: "100px",
                width: "100px",
                objectFit: "cover",
                borderRadius: "10px"
              }} />
              <div style={{ marginLeft: "20px" }}>
                <h3 style={{ margin: "0", fontWeight: "500" }}>{ele.title}</h3>
                <p style={{ margin: "5px 0", color: "#666" }}>
                  ${ele.price} × {ele.quantity}
                </p>
              </div>
            </div>
            <h3 style={{ color: "#333" }}>
              ${(ele.price * ele.quantity)}
            </h3>
          </div>
        ))}

        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "30px"
        }}>
          <h2 style={{ marginRight: "20px", fontWeight: "600" }}>
            Total: ${total}
          </h2>
          <button
            onClick={handlePlaceOrder}
            style={{
              padding: "12px 25px",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "500",
              transition: "0.3s"
            }}

          >
            Place Order
          </button>
        </div>
      </div>

      <ToastContainer />
      <Footer />
    </>
  )
}

export default Checkout
