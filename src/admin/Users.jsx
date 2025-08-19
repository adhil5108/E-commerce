import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'


function Users() {
     let [users, setUsers] = useState([])
    let [input1,setinput]=useState("")
   let [filter,setfilter]=useState("all")
     
    let navigate=useNavigate()
    useEffect(() => {
        axios.get("http://localhost:4000/users")
            .then((res) => setUsers(res.data))
            .catch(err => console.error(err))
    }, [])

    function block(user) {

        if (user.status === "active") {
            axios.patch(`http://localhost:4000/users/${user.id}`, { status: "blocked" })
            .then(setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? { ...u, status: "blocked" } : u)))
            .catch(err => console.error(err))
        }
        else if (user.status === "blocked") {
            axios.patch(`http://localhost:4000/users/${user.id}`, { status: "active" })
                .then(setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? { ...u, status: "active" } : u)))
                .catch(err => console.error(err))
        }
    }

    function click(user){
        navigate(`/admin/users/${user.id}`)
    }

    let userss = users.filter(e => e.role === "user")

  let newUsers = userss.filter((p) =>
    p.name.toLowerCase().includes(input1.toLowerCase()))

 if (filter==="active"){
       newUsers= newUsers.filter((e)=>e.status==="active")
    }
 if (filter==="blocked"){
       newUsers= newUsers.filter((e)=>e.status==="blocked")
    }

    return (
       <>
    <Navbar />
    <h1 style={{ fontSize: "50px", fontWeight: "500", margin: "150px 0 20px", display: "flex", justifyContent: "center" }}>
        Users
    </h1>

    <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "40px" }}>
        <input
            type="text"
            placeholder="Search users..."
            style={{
                padding: "10px 15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "250px"
            }} onChange={(e)=>setinput(e.target.value)} />
        <select
            style={{
                padding: "10px 15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "150px"
            }}onChange={(e) => setfilter(e.target.value)} value={filter} >
            <option value="all" >All</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
        </select>
    </div>

    <div
        style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            padding: "20px",
            justifyContent: "center",
        }}>



        {newUsers.map(user => (
            <div
                key={user.id}
                style={{
                    backgroundColor: "#f9f9f9",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    width: "200px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "250px"
                }}
                onClick={() => click(user)}
            >
                <div>
                    <h2>{user.name}</h2>
                    <p>Email: <br /><span> {user.email}</span></p>
                    <p>Status: <span style={{ color: user.status === "blocked" ? "red" : "#03e903" }}> {user.status}</span> </p>
                </div>
                <button
                    style={{
                        padding: "8px 15px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "white", color: "black",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        cursor: "pointer",
                        fontWeight: "500",
                        width: "100px",
                        margin: "0 auto",
                        display: "block",
                    }}
                    onClick={(e) => {
                        e.stopPropagation()
                        block(user)
                    }}
                >
                    {user.status === "blocked" ? "Unblock" : "Block"}
                </button>
            </div>
        ))}
    </div>
</>

    )

    
}

export default Users
