import React, { useState } from 'react'
import Navbar from '../components/navbar'
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Displaypro from './Displaypro'
import { useNavigate } from 'react-router-dom'

function Products() {
  let [newp, setnewp] = useState({
    title: "",
    brand: "",
    description: "",
    price: "",
    status: "available",
    image: ""
  })

  let [error, seterror] = useState({})

  let navigate = useNavigate()

  function validate(values) {
    let error = {}

    if (values.title.length === 0) error.title = "Title is required"
    if (values.brand.length === 0) error.brand = "Brand is required"
    if (values.description.length === 0) error.description = "Description is required"

    if (values.price.length === 0) {
      error.price = "Price is required"
    } else if (values.price <= 0) {
      error.price = "Price must be greater than 0"
    }

    if (values.image.length === 0) {
      error.image = "Image URL is required"
    }
    return error
  }

  function onchange(e) {
    setnewp(p => ({
      ...p,
      [e.target.name]: e.target.value
    }))
  }
function onclick() {
  const validationErrors = validate(newp)
  if (Object.keys(validationErrors).length > 0) {
    seterror(validationErrors)
    return
  }

  axios.get("http://localhost:4000/products")
    .then(res => {
      let dupe = res.data.find(p =>
        p.title.toLowerCase() === newp.title.toLowerCase() &&
        p.brand.toLowerCase() === newp.brand.toLowerCase()
      );

      if (dupe) {
        toast.error("Product with this title and brand already exists!")
        return
      }

      
      axios.post("http://localhost:4000/products", newp)
        .then(res => {
          toast.success("Product added successfully!");
          setnewp({ title: "", brand: "", description: "", price: "", status: "available", image: "" })
          navigate('/admin/products');
        })
        .catch(err => console.log("Error", err));
    })
    .catch(err => console.error(err))
}

  return (
    <>
      <Navbar />
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "50px",
          fontWeight: "400",
          fontFamily: "inherit",
          marginTop: "80px",
          color: "grey",
        }}>
        Products
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          fontFamily: "Arial, sans-serif",
        }} >
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            width: "700px",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#333",
              borderBottom: "2px solid #f0f0f0",
              paddingBottom: "10px",
            }}>
            Add Product
          </h2>

          <input
            type="text"
            placeholder="Title"
            name="title"
            value={newp.title}
            onChange={onchange}
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }} />
          {error.title && <p style={{ color: "red" }}>{error.title}</p>}

          <input
            type="text"
            placeholder="Brand"
            name="brand"
            value={newp.brand}
            onChange={onchange}
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }} />
          {error.brand && <p style={{ color: "red" }}>{error.brand}</p>}

          <textarea
            placeholder="Description"
            name="description"
            value={newp.description}
            onChange={onchange}
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              minHeight: "80px",
              resize: "vertical",
            }} />
          {error.description && <p style={{ color: "red" }}>{error.description}</p>}

          <input
            type="number"
            placeholder="Price"
            name="price"
            value={newp.price}
            onChange={onchange}
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }} />
          {error.price && <p style={{ color: "red" }}>{error.price}</p>}

          <input
            type="text"
            placeholder="Image URL"
            name="image"
            value={newp.image}
            onChange={onchange}
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }} />
          {error.image && <p style={{ color: "red" }}>{error.image}</p>}

          <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
            <button
              onClick={onclick}
              style={{
                width: "200px",
                padding: "12px 20px",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "600",
                color: "#333",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "0.3s ease",
              }}>
              Add Product
            </button>
          </div>
        </div>
      </div>

<ToastContainer position="top-right" style={{ top: "75px" }} autoClose={1000} />
    </>
  )
}

export default Products
