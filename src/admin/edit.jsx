import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Edit() {
    let[prod,setprod]=useState({    title: "",
    brand: "",
    description: "",
    price: "",
    image: ""})

    let {id}=useParams()

    let navigate=useNavigate()

useEffect(()=>{
axios.get(`http://localhost:4000/products/${id}`)
.then((res)=>setprod(res.data))
.catch(err=>console.error(err))
},[])

function onChange(e){
setprod(p=>({...p,[e.target.name]:e.target.value}))
}

function submit(e){
    e.preventDefault()
    axios.put(`http://localhost:4000/products/${id}`,prod )
    .then(()=> toast.success("Product updated successfully"))    
    .catch(err=>console.error(err))

   navigate('/admin/products') 
}

  return (
    <div
  style={{
    maxWidth: "600px",
    margin: "50px auto",
    padding: "30px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
  }}
>
  <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Edit Product</h2>

  <form>
    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>Title</label>
      <input
        type="text"
        name='title'
        placeholder="Enter title"
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      onChange={(e)=>onChange(e)}
      value={prod.title} />
    </div>

    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>Brand</label>
      <input
        type="text"
        placeholder="Enter brand"
          name='brand'
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      onChange={(e)=>onChange(e)}
      value={prod.brand}/>
    </div>

    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>Description</label>
      <textarea
        placeholder="Enter description"
        name='description'
        rows="4"
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      onChange={(e)=>onChange(e)}
      value={prod.description} />
    </div>

    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>Price</label>
      <input
        type="number"
        name='price'
        placeholder="Enter price"
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
       onChange={(e)=>onChange(e)}
      value={prod.price}/>
    </div>

    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>Image URL</label>
      <input
        type="text"
        placeholder="Enter image link"
        name='image'
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
       onChange={(e)=>onChange(e)}
      value={prod.image}/>
    </div>
<button
  type="submit"
  style={{
    display: "block",        
    margin: "20px auto",     
    padding: "10px 24px",   
    background: "white",
    color: "#b8860b",
    border: "2px solid #b8860b",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease-in-out",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#b8860b"
    e.currentTarget.style.color = "white"
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "white"
    e.currentTarget.style.color = "#b8860b"
  }}
 onClick={(e)=>submit(e)}>
  Update Product
</button>


  </form>
</div>

  )
}

export default Edit