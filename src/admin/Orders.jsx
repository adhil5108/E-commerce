import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";

function Orders() {
  let [orders, setOrders] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:4000/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err))
  }, []);

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "50px",
            fontWeight: "100",
            fontFamily: "inherit",
            marginTop: "100px",
          }}
        >
          Orders
        </h1>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4" }}>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                S.No
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Product ID
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Customer ID
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Quantity
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Amount
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order.id}
                  style={{ backgroundColor: "#fff", fontSize: "14px" }}
                >
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                    {index + 1}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                    {order.id}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                    {order.userid}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                    {order.quantity}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                    ${order.price * order.quantity}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "12px",
                        fontWeight: "600",
                        fontSize: "12px",
                        backgroundColor: "#d4edda",
                      }}
                    >
                      Delivered
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "15px",
                    color: "#666",
                  }}
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Orders;
