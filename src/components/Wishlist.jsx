import React, { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "./navbar"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


function Wishlist() {
  let [wishlist, setWishlist] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:4000/wishlist")
      .then((res) => setWishlist(res.data))
      .catch((err) => console.error(err))
  }, []);

  function remove(item) {
    axios
      .delete(`http://localhost:4000/wishlist/${item.id}`)
      .then(() => {
        setWishlist((prev) => prev.filter((e) => e.id !== item.id))
      })
      .catch((err) => {
        console.error(err)
      })
  }

 function addToCart(item) {
  axios
    .get(`http://localhost:4000/cart?userid=${localStorage.getItem("id")}`)
    .then((res) => {
      const eItem = res.data.find(
        (cartItem) => cartItem.title === item.title
      )

      if (eItem) {
        toast.info(`${item.title} is already in your cart 🛒`);
      } else {
        axios
          .post("http://localhost:4000/cart", {
            ...item,
            quantity: 1,
            userid: localStorage.getItem("id"),
          })
          .then(() => {
            toast.success(`${item.title} added to cart! 🛒`);
            return axios.delete(`http://localhost:4000/wishlist/${item.id}`);
          })
          .then(() => {
            setWishlist((prev) => prev.filter((e) => e.id !== item.id));
          })
          .catch((err) => console.error(err));
      }
    })
    .catch((err) => console.error(err));
}


  let data1 = wishlist.filter(
    (e) =>String(e.userid) === localStorage.getItem("id")
  )

  
  return (
    <>
    <Navbar/>
    <div style={{ padding: "20px", maxWidth: "900px", margin: "60px auto" }}>
        <h1 
    style={{ 
      textAlign: "center", 
      marginBottom: "30px", 
      fontSize: "2rem", 
      fontWeight: "bold",
      color: "#090909ff",
      borderBottom: "2px solid #ddd",
      paddingBottom: "10px",fontSize: "50px", fontWeight: "100", fontFamily: "inherit" 
    }}
  >
    Wishlist
  </h1>
      <h2 style={{ marginBottom: "20px" }}>Your Wishlist</h2>
      {data1.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {data1.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                background: "#fff",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                border: "1px solid #eee",
              }}>
             
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginRight: "15px",
                  border: "1px solid #ddd",
                }}/>

            
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 5px" }}>{item.title}</h3>
                <p style={{ fontWeight: "bold", color: "#333" }}>
                  ${item.price}
                </p>
              </div>

          
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <button
                  onClick={() => addToCart(item)}
                  style={{
                    background: "#090909ff",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}>
                  Add to Cart
                </button>
                <button
                  onClick={() => remove(item)}
                  style={{
                    background: "#dc3545",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No items in wishlist</p>
      )}
    </div>
  
    </>
  )
}

export default Wishlist
