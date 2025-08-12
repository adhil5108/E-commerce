import React, { useEffect, useState } from "react"
import axios from "axios"
import { FaSearch } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import Footer from './Footer'
import Navbar from './navbar'
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


function Allcollections() {
  const [data, setData] = useState([])
  const [idata, setIdata] = useState("")
  const [newdata, setnewData] = useState([])
  const [searched, setSearched] = useState(false)


  useEffect(() => {
    axios
      .get("http://localhost:4000/products")
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  function inputstore(e) {
    setIdata(e.target.value)
  }

  function click() {
    setSearched(true);
    const search = data.filter(
      (p) =>
        p.title.toLowerCase().includes(idata.toLowerCase()) ||   p.brand.toLowerCase().includes(idata.toLowerCase())
       )
    setnewData(search)
  }

  const displayProducts = searched ? newdata : data

  function handleSort(e) {
    const value = e.target.value
    let sortedProducts = [...displayProducts]

    if (value === "low-high") {
      sortedProducts.sort((a, b) => a.price - b.price)
    } else if (value === "high-low") {
      sortedProducts.sort((a, b) => b.price - a.price)
    } else {
      sortedProducts =  data
    }

    setnewData(sortedProducts)
    setSearched(true)
  }

function cart(product) {
  axios.post('http://localhost:4000/cart', { ...product,quantity:1, userid: localStorage.getItem("id") })
    .then(() => {
      toast.success(`${product.title} added to cart! 🛒`)
    })
    .catch(err => {console.error(err)})
}


  return (
    <>
    <Navbar/>
      <section
        style={{
          marginTop: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "50px", fontWeight: "100", fontFamily: "inherit" }}>
          All products
        </h1>

        <div style={{ display: "flex", gap: "20px", justifyContent: "space-around" }}>
          <input
            type="search"
            style={{
              width: "300px",
              height: "40px",
              borderRadius: "15px",
              border: "none",
              padding: "15px",
              boxShadow: "10px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
            onChange={inputstore}
            onKeyDown={(e) => {
              if (e.key="Enter" || e.key === "Enter") {
                click()
              }

            }}



          />
          <button
            style={{
              height: "40px",
              borderRadius: "15px",
              border: "none",
              padding: "15px",
              display: "flex",
              alignItems: "center",
              background: "white",
              boxShadow: "10px 4px 12px rgba(0, 0, 0, 0.1)",
            }}
            onClick={click}
          >
            <FaSearch />
          </button>

          <select
            name="drop"
            id="drop"
            style={{
              marginLeft: "100px",
              height: "40px",
              borderRadius: "5px",
              backgroundColor: "white",
              paddingLeft: "10px",
              paddingRight: "10px",
              border: "none"
            }}
            onChange={handleSort}
          >
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="default">Default</option>
          </select>


        </div>


        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          {displayProducts.length > 0 ? (
            displayProducts.map((product, index) => (
              <div
                key={index}
                style={{
                  width: "320px",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  margin: "20px",
                  fontFamily:
                    "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />
                <div style={{ padding: "15px", flexGrow: 1 }}>
                  <h3
                    style={{
                      margin: "10px 0 5px",
                      fontWeight: "bold",
                      fontSize: "1.3rem",
                    }}
                  >
                    {product.title}
                  </h3>
                  <h4
                    style={{
                      margin: "0 0 10px",
                      fontWeight: "600",
                      color: "#555",
                      fontStyle: "italic",
                    }}
                  >
                    {product.brand}
                  </h4>
                  <p
                    style={{
                      color: "#555",
                      fontSize: "0.9rem",
                      minHeight: "48px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      marginBottom: "15px",
                    }}
                  >
                    {product.description}
                  </p>
                  <p
                    style={{
                      fontWeight: "bold",
                      color: "#2c7a2c",
                      fontSize: "1.2rem",
                    }}
                  >
                    ${product.price}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    padding: "0 15px 15px",
                  }}
                >
                  <button
                    style={{
                      flex: 1,
                      padding: "10px 0",
                      backgroundColor: "#070707ff",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    onClick={()=>cart(product)}
                  >
                    Add to cart
                  </button>

                  <button
                    style={{
                      flex: 1,
                      padding: "10px 0",
                      backgroundColor: "#070707ff",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    <NavLink to={`/allcollection/${product.id}`} style={{ textDecoration: "none", color: "white" }} >View more</NavLink>

                  </button>
                </div>
              </div>
            ))
          ) : (
            searched && <h2 style={{ color: "#888" }}>No products found</h2>
          )}
        </div>

      </section>
      <Footer />
    </>
  );
}

export default Allcollections;
