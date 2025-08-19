import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams,NavLink } from "react-router-dom"
import Navbar from "./navbar"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

function Productinfo() {
  let { productid } = useParams()

  const [data, setData] = useState({})
  let [users,setusers]=useState([])

  console.log(productid)
  useEffect(() => {

    axios
      .get(`http://localhost:4000/products/${productid}`)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [productid])


useEffect(()=>{
 axios
      .get("http://localhost:4000/users")
      .then((response) => {
        setusers(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

},[])

 let user = users.find((e) => String(e.id) === String(localStorage.getItem("id")))

  function cart(product) {
    const userId = localStorage.getItem("id");

    if (userId) {
      axios.get(`http://localhost:4000/cart?userid=${userId}&id=${product.id}`)
      .then((res) => {
        if (res.data.length > 0) {

          toast.info(`${product.title} is already in your cart!`);
        } else {

          axios.post('http://localhost:4000/cart', { ...product, quantity: 1, userid: userId })
            .then(() => {
              toast.success(`${product.title} added to cart! 🛒`);
            })
            .catch(err => {
              console.error(err);
              toast.error("Failed to add to cart.");
            });
        }
      })
      .catch(err => {
        console.error("Error checking cart:", err)
      })
    }
    else { toast.info(
    <div>
      Please log in first!{" "}
      <NavLink
        to="/login"
        style={{
          color: "#B29700",
          textDecoration: "underline",
          cursor: "pointer",
        }}>
        Login
      </NavLink>
    </div>
  )}
  } 

  return (
    <><Navbar />
      <div
        style={{
          fontFamily: "sans-serif",
          background: "#f5f5f5",
          minHeight: "100vh",
          padding: "40px 20px",
          marginTop: "100px"
        }}>
        <div
          style={{
            maxWidth: "900px",
            margin: "auto",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            overflow: "hidden",
            display: "flex",
            flexWrap: "wrap",
          }}>

          <div
            style={{
              flex: "1 1 300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}>
            <img
              src={data.image}
              alt={data.title}
              style={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: "8px",
                objectFit: "contain",
              }}/>
          </div>

          <div style={{ flex: "1 1 500px", padding: "20px 30px" }}>
            <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>{data.title}</h1>
            <h3 style={{ color: "#777", marginBottom: "15px" }}>{data.brand}</h3>
            <h2
              style={{
                color: "#e67e22",
                marginBottom: "20px",
              }}>
              ${data.price}
            </h2>
            <p style={{ marginBottom: "20px", lineHeight: "1.6" }}>
              {data.description}
            </p>

            <h3 style={{ marginBottom: "10px" }}>About This Watch</h3>
            <p style={{ marginBottom: "30px", lineHeight: "1.6" }}>
              A premium watch is the perfect harmony of art and engineering, crafted for those who value both beauty and precision. Every curve, dial, and movement tells a story of heritage and craftsmanship, often built by master watchmakers who dedicate countless hours to perfection. Made with the finest materials — from sapphire crystal to polished stainless steel and rare leathers — it’s more than an accessory; it’s a legacy you wear on your wrist. A premium watch doesn’t just mark time, it elevates it, turning every second into a statement of sophistication.
            </p>

            <button
              style={{
                padding: "12px 24px",
                background: "#e67e22",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",display:user?.role==="admin"?"none":"inline"
              }}
              onClick={() => cart(data)} >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" style={{ top: "75px" }} />
    </>
  )

}

export default Productinfo;
