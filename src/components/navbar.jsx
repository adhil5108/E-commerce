import React, {  useEffect, useState } from "react";
import { FaHeart, FaShoppingCart,  FaBars } from "react-icons/fa"
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";


function Navbar() {
  
  let [wish, setwish] = useState([])
  let [cart, setcart] = useState([])
  let [users, setuser] = useState([])
  let [bar, setbar] = useState(false)

useEffect(() => {
  const fetchData = () => {
    axios.get("http://localhost:4000/wishlist")
      .then((res) => setwish(res.data))
      .catch((err) => console.error(err))

    axios.get("http://localhost:4000/cart")
      .then((res) => setcart(res.data))
      .catch((err) => console.error(err))

    axios.get("http://localhost:4000/users")
      .then((res) => setuser(res.data))
      .catch((err) => console.error(err))
  }

  fetchData()

  // const interval = setInterval(fetchData, 1000)
  // return () => clearInterval(interval)
}, [])


  let navigate = useNavigate()
  const logged = !!localStorage.getItem("name")

  let wishlist = wish.filter((e) => e.userid === localStorage.getItem("id"))
  let wishcount = wishlist.length

  let cartlist = cart.filter((e) => e.userid === localStorage.getItem("id"))
  let cartcount = cartlist.length

  let user = users.find((e) => e.id == localStorage.getItem("id"))


  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          zIndex: 50,
        }}>
        {user?.role === "admin" && (
          <div
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "#fff",
              color: "#101010",
              padding: "10px",
              borderRadius: "20%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}>
            <FaBars style={{ fontSize: "1.5rem" }} onClick={() => setbar(true)} />

            {bar && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: -18,
                  width: "280px",
                  height: "100vh",
                  background: "linear-gradient(180deg, #1C1C1C, #2E2E2E)",
                  color: "#fff",
                  padding: "24px",
                  zIndex: 1000,
                  transition: "all 0.3s ease",
                  boxShadow: "4px 0 12px rgba(0,0,0,0.4)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3
                    style={{
                      marginBottom: "20px",
                      color: "#FFD700",
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                      borderBottom: "2px solid #FFD700",
                      paddingBottom: "8px",
                      textAlign: "center",
                    }}
                  >
                    Admin Menu
                  </h3>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    <li style={{
                      margin: "12px 0",
                      padding: "10px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      fontWeight: 500, borderBottom: "1px solid rgba(255, 255, 255, 0.2)"
                    }}  onClick={()=>navigate('/admin/dashboard')} > Dashboard</li>
                    <li style={{
                      margin: "12px 0",
                      padding: "10px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      fontWeight: 500, borderBottom: "1px solid rgba(255, 255, 255, 0.2)"
                    }}  onClick={()=>navigate('/admin/users')} > Users</li>
                    <li style={{
                      margin: "12px 0",
                      padding: "10px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      fontWeight: 500, borderBottom: "1px solid rgba(255, 255, 255, 0.2)"
                    }} onClick={()=>navigate('/admin/products')}>Products</li>
                    <li style={{
                      margin: "12px 0",
                      padding: "10px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      fontWeight: 500, borderBottom: "1px solid rgba(255, 255, 255, 0.2)"
                    }} onClick={()=>navigate('/admin/orders')}> orders</li>
                  </ul>
                </div>

                <button
                  style={{
                    alignSelf: "center",
                    marginBottom: "50px",
                    background: "#FFD700",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    color: "#1C1C1C",
                    fontWeight: "600",
                    fontSize: "1rem",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => setbar(false)}>
                   Close
                </button>
              </div>
            )}
          </div>
        )}

        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
          }}>
          <NavLink
            to={'/'}
            style={{
              fontFamily: "serif",
              fontSize: "2rem",
              fontWeight: "bold",
              textDecoration: "none",
              color: "#2E2E2E",marginLeft:user?.role==="admin"?'540px':'0px'
            }}>
            TimeLux
          </NavLink>

          <nav style={{ display: "flex", gap: "32px" }}>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "#B29700" : "#2E2E2E",
                fontWeight: 500,
                textDecoration: "none",
                borderBottom: isActive ? "2px solid #B29700" : "none",
                paddingBottom: "2px",display: user?.role === "admin" ? "none" : "inline"
              })} >
              Home
            </NavLink>

            <NavLink
              to="/allcollection"
              style={({ isActive }) => ({
                color: isActive ? "#B29700" : "#2E2E2E",
                fontWeight: 500,
                textDecoration: "none",
                borderBottom: isActive ? "2px solid #B29700" : "none",
                paddingBottom: "2px",display: user?.role === "admin" ? "none" : "inline"
              })}>
              All Collections
            </NavLink>

            <NavLink
              to="/brands"
              style={({ isActive }) => ({
                color: isActive ? "#B29700" : "#2E2E2E",
                fontWeight: 500,
                textDecoration: "none",
                borderBottom: isActive ? "2px solid #B29700" : "none",
                paddingBottom: "2px",display: user?.role === "admin" ? "none" : "inline"
              })}>
              Brands
            </NavLink>

            <NavLink
              to="/about"
              style={({ isActive }) => ({
                color: isActive ? "#B29700" : "#2E2E2E",
                fontWeight: 500,
                textDecoration: "none",
                borderBottom: isActive ? "2px solid #B29700" : "none",
                paddingBottom: "2px",display: user?.role === "admin" ? "none" : "inline"
              })}>
              About
            </NavLink>
          </nav>

          <div 
            style={{
              display: "flex",
              gap: "24px",
              color: "#2E2E2E",
              fontSize: "1.1rem",
              alignItems: "center",
            }} >
         
                 
            <div
              onClick={() => {
                if (logged) {
                  navigate("/wishlist")
                } else {
                  toast.info(
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
                  )
                }
              }}
              style={{
                color: "#2E2E2E",
                transition: "color 0.3s ease",
                cursor: "pointer",
              }}>
              <FaHeart style={{height:"23px",width:"23px",display: user?.role === "admin" ? "none" : "inline"}}   />
              {localStorage.getItem("id") && <span
                style={{
                  position: "relative",
                  top: "-15px",
                  right: "10px",
                  background: "#B29700",
                  color: "#fff",
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  padding: "2px 6px",
                  borderRadius: "50%",
                  display: user?.role === "admin" ? "none" : "inline"
                }}>
                {wishcount}
              </span>}

            </div>
            <div
              onClick={() => {
                if (logged) {
                  navigate("/cart")
                } else {
                  toast.info(
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
                  )
                }
              }}
              style={{
                color: "#2E2E2E",
                transition: "color 0.3s ease",
                cursor: "pointer",
              }}>
              <FaShoppingCart style={{height:"23px",width:"23px",display: user?.role === "admin" ? "none" : "inline"}}/>
              {localStorage.getItem("id") && <span
                style={{
                  position: "relative",
                  top: "-16px",
                  right: "9px",
                  background: "#B29700",
                  color: "#fff",
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  padding: "2px 6px",
                  borderRadius: "50%",display: user?.role === "admin" ? "none" : "inline"
                }}
              >
                {cartcount}
              </span>}

            </div>
           

            <div
              onClick={() => {
                if (logged) {
                  navigate("/profile")
                } else {
                  navigate("/login")
                }
              }}
              style={{
                color: "#2E2E2E",
                transition: "color 0.3s ease",
                cursor: "pointer",
              }}>
              {localStorage.getItem("id") ? <>
                <button style={{
                  padding: "6px 16px",
                  border: "1px solid #B29700",
                  borderRadius: "20px",
                  background: "transparent",
                  color: "#2E2E2E",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}>Logout</button>

              </> : <><button style={{
                padding: "6px 16px",
                border: "1px solid #B29700",
                borderRadius: "20px",
                background: "transparent",
                color: "#2E2E2E",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s ease",

              }}>Login</button></>}
            </div>
          </div>
        </div>
      </header>

      <ToastContainer />
    </>
  )
}

export default Navbar;
