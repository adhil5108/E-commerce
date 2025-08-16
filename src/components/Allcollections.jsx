import React, { useEffect, useState } from "react"
import axios from "axios"
import { FaSearch } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import Footer from './Footer'
import Navbar from './navbar'
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FaHeart } from "react-icons/fa"
import { ToastContainer } from "react-toastify"

function Allcollections() {
  const [data, setData] = useState([])
  const [idata, setIdata] = useState("")
  const [newdata, setnewData] = useState([])
  const [brandFilter, setBrandFilter] = useState("")
  const [wishlist, setWishlist] = useState([])


  useEffect(() => {
    axios
      .get("http://localhost:4000/products")
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    const userId = localStorage.getItem("id")
    if (userId) {
      axios.get(`http://localhost:4000/wishlist?userid=${userId}`)
        .then(res => setWishlist(res.data))
        .catch(err => console.error(err))
    }

  }, [])



  function inputstore(e) {
    setIdata(e.target.value)
  }

  function click() {
    let search = data
    if (idata) {
      search = search.filter((p) => p.title.toLowerCase().includes(idata.toLowerCase()) || p.brand.toLowerCase().includes(idata.toLowerCase()))
    }
    if (brandFilter) {
      search = search.filter((p) => p.brand.toLowerCase() === brandFilter.toLowerCase())
    }
    setnewData(search)
  }

  const displayProducts = newdata.length > 0 ? newdata : data

  function handleSort(e) {
    const value = e.target.value
    let sortedProducts = [...displayProducts]

    if (value === "low-high") {
      sortedProducts.sort((a, b) => a.price - b.price)
    } else if (value === "high-low") {
      sortedProducts.sort((a, b) => b.price - a.price)
    } else {
      sortedProducts = data
    }

    setnewData(sortedProducts)
  }

  function handleBrandFilter(e) {
    const value = e.target.value
    setBrandFilter(value)
    let filtered = data
    if (idata) {
      filtered = filtered.filter(
        (p) => p.title.toLowerCase().includes(idata.toLowerCase()) || p.brand.toLowerCase().includes(idata.toLowerCase())
      )
    }
    if (value) {
      filtered = filtered.filter((p) => p.brand.toLowerCase() === value.toLowerCase())
    }
    setnewData(filtered)
  }

  function cart(product) {
    const userId = localStorage.getItem("id")

    axios.get(`http://localhost:4000/cart?userid=${userId}&id=${product.id}`)
      .then((res) => {
        if (res.data.length > 0) {
          toast.info(`${product.title} is already in your cart 🛒`)
        } else {
          axios.post('http://localhost:4000/cart', { ...product, quantity: 1, userid: userId })
            .then(() => {
              toast.success(`${product.title} added to cart! 🛒`)
            })
            .catch(err => {
              console.error(err)
            })
        }
      })
      .catch(err => {
        console.error(err)
        toast.error("Error checking cart")
      })
  }

  function wish(product) {
    const userId = localStorage.getItem("id")

    axios.get(`http://localhost:4000/wishlist?userid=${userId}&id=${product.id}`)
      .then((res) => {
        if (res.data.length > 0) {
          toast.info(`${product.title} is already in your wishlist ❤️`)
        } else {
          axios.post('http://localhost:4000/wishlist', { ...product, userid: userId })
            .then(() => {
              setWishlist(prev => [...prev, product])
            })
            .catch(err => {
              console.error(err)
            })
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  const brands = [...new Set(data.map((item) => item.brand))]


  return (
    <>
      <Navbar />
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
              if (e.key === "Enter" || e.key) {
                click()
              }
            }} placeholder="search products... "/>
          <button
            style={{
              height: "40px",
              borderRadius: "15px",
              border: "none",
              padding: "15px",
              display: "flex",
              alignItems: "center",
              background: "white",
              boxShadow: "10px 4px 12px rgba(0, 0, 0, 0.1)", marginRight: "60px"
            }}
            onClick={click}>
            <FaSearch />
          </button>

          <select
            name="drop"
            id="drop"
            style={{
              height: "40px",
              borderRadius: "5px",
              backgroundColor: "white",
              paddingLeft: "10px",
              paddingRight: "10px",
              border: "none"
            }}
            onChange={handleSort}>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="default">Default</option>
          </select>

          <select
            name="brand"
            id="brand"
            style={{
              height: "40px",
              borderRadius: "5px",
              backgroundColor: "white",
              paddingLeft: "10px",
              paddingRight: "10px",
              border: "none"
            }}
            onChange={handleBrandFilter}>
            <option value="">All Brands</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "40px",
          }}>
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
                  position: "relative"
                }}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }} />
                <FaHeart
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    color: wishlist.some(item => String(item.id) === String(product.id)) ? "red" : "white",

                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  onClick={localStorage.getItem("id") ? (e) => wish(product, e) : () => toast.info(
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
                />
                <div style={{ padding: "15px", flexGrow: 1 }}>
                  <h3
                    style={{
                      margin: "10px 0 5px",
                      fontWeight: "bold",
                      fontSize: "1.3rem",
                    }}>
                    {product.title}
                  </h3>
                  <h4
                    style={{
                      margin: "0 0 10px",
                      fontWeight: "600",
                      color: "#555",
                      fontStyle: "italic",
                    }}>
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
                    }}>
                    {product.description}
                  </p>
                  <p
                    style={{
                      fontWeight: "bold",
                      color: "#2c7a2c",
                      fontSize: "1.2rem",
                    }}>
                    ${product.price}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    padding: "0 15px 15px",
                  }}>
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
                    onClick={localStorage.getItem("id") ? () => cart(product) : () => toast.info(
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
                    )}>
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
                    }}>
                    <NavLink to={`/allcollection/${product.id}`} style={{ textDecoration: "none", color: "white" }} >View more</NavLink>
                  </button>
                </div>
              </div>
            ))
          ) : (
            idata&&displayProducts.length===0&& <h2 style={{ color: "#888" }}>No products found</h2>
          )}
        </div>
      </section>
      <Footer />
      <ToastContainer position="top-right" style={{ top: "75px" }} autoClose="1000" />
    </>
  )
}

export default Allcollections
