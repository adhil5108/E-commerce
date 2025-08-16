import React from "react";
import { FaUserPlus, FaHeart, FaShoppingCart } from "react-icons/fa"
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function Navbar() {
  const navigate = useNavigate()
  const logged = !!localStorage.getItem("name")

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
              textDecoration:"none",
              color: "#2E2E2E",
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
                paddingBottom: "2px",
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
                paddingBottom: "2px",
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
                paddingBottom: "2px",
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
                paddingBottom: "2px",
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
            }}>
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
              <FaHeart />
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
              <FaShoppingCart />
            </div>
            <div
              onClick={() => {
                if (logged) {
                  navigate("/profile")
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
              <FaUserPlus />
            </div>
          </div>
        </div>
      </header>

      <ToastContainer />
    </>
  )
}

export default Navbar;
