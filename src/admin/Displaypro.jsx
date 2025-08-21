import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate ,NavLink} from "react-router-dom";
import ReactPaginate from "react-paginate";

function Displaypro() {
  let [prod, setProd] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const productsPerPage = 10

  let navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:4000/products")
      .then((res) => setProd(res.data))
      .catch((err) => console.error(err))
  }, [])

  function dlt(p) {
    axios.delete(`http://localhost:4000/products/${p.id}`)
      .then(() => {
        setProd((prev) => prev.filter((item) => item.id !== p.id))
        toast.success("product deleted sucesfullly");
      })
      .catch((err) => console.error(err))
  }

  function inactive(p) {
    if (p.status === "available") {
      axios
        .patch(`http://localhost:4000/products/${p.id}`, { status: "not available" })
        .then(() => {
          setProd((prev) =>
            prev.map((item) =>
              item.id === p.id ? { ...item, status: "not available" } : item
            )
          );
        })
        .catch((err) => console.error(err))
    } else if (p.status === "not available") {
      axios
        .patch(`http://localhost:4000/products/${p.id}`, { status: "available" })
        .then(() => {
          setProd((prev) =>
            prev.map((item) =>
              item.id === p.id ? { ...item, status: "available" } : item
            )
          )
        })
        .catch((err) => console.error(err))
    }
  }

  const offset = currentPage * productsPerPage
  const currentProducts = prod.slice(offset, offset + productsPerPage)
  const pageCount = Math.ceil(prod.length / productsPerPage)

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected)
  }

  const btnStyle = () => ({
    background: "transparent",
    color: "#b8860b",
    border: "2px solid #b8860b",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease-in-out",
    margin: "2px 0",
  })

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "30px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          minHeight: "100vh",
          marginTop:"100px"
        }}
      >
        
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              fontSize: "50px",
              fontWeight: "400",
              fontFamily: "inherit",
              color: "black",
              margin: 0,
            }}
          >
            Products
          </h2>

          <NavLink
            to="/admin/addproduct"
            style={{
              background: "#b8860b",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: "600",
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(184, 134, 11, 0.4)",
              transition: "all 0.3s ease-in-out",
            }}>
            Add Product
          </NavLink>
        </div>

        <div
          style={{
            overflowX: "auto",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            border: "1px solid #f5deb3",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#fff8dc",
                  color: "#b8860b",
                  textAlign: "center",
                  borderBottom: "2px solid #f0e68c",
                }}
              >
                <th style={{ padding: "14px" }}>ID</th>
                <th style={{ padding: "14px" }}>Image</th>
                <th style={{ padding: "14px" }}>Title</th>
                <th style={{ padding: "14px" }}>Brand</th>
                <th style={{ padding: "14px" }}>Description</th>
                <th style={{ padding: "14px" }}>Price</th>
                <th style={{ padding: "14px" }}>Status</th>
                <th style={{ padding: "14px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((p) => (
                <tr
                  key={p.id}
                  style={{
                    borderBottom: "1px solid #f5f5dc",
                    transition: "background 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#fffaf0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td style={{ padding: "12px", textAlign: "center" }}>{p.id}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "2px solid #b8860b",
                        }}
                      />
                    ) : (
                      <span style={{ color: "#bbb" }}>No Image</span>
                    )}
                  </td>
                  <td style={{ padding: "12px", fontWeight: "500" }}>{p.title}</td>
                  <td style={{ padding: "12px", color: "#444" }}>{p.brand}</td>
                  <td
                    style={{
                      padding: "12px",
                      color: "#666",
                      maxWidth: "280px",
                      textAlign: "left",
                    }}
                  >
                    {p.description}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      color: "#b8860b",
                      fontWeight: "700",
                    }}
                  >
                    ${p.price}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      color: p.status === "available" ? "green" : "red",
                      fontWeight: "500",
                    }}
                  >
                    {p.status}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <button
                        style={btnStyle()}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#b8860b";
                          e.currentTarget.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "#b8860b";
                        }}
                        onClick={() => navigate(`/admin/product/${p.id}`)}
                      >
                        Edit
                      </button>

                      <button
                        style={btnStyle()}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#b8860b";
                          e.currentTarget.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "#b8860b";
                        }}
                        onClick={() => dlt(p)}
                      >
                        Delete
                      </button>

                      <button
                        style={btnStyle()}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#b8860b";
                          e.currentTarget.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "#b8860b";
                        }}
                        onClick={() => inactive(p)}
                      >
                        {p.status === "not available" ? "active" : "inactive"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          pageClassName={""}
          pageLinkClassName={""}
          previousClassName={""}
          previousLinkClassName={""}
          nextClassName={""}
          nextLinkClassName={""}
          activeClassName={"active"}
        />
      </div>

      <ToastContainer position="top-right" style={{ top: "75px" }} autoClose={1000} />
    </>
  )
}

export default Displaypro;
