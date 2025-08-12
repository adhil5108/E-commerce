import React, { useEffect, useState } from 'react';
import './Login.css';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
function Login() {
const [data,setData]=useState({name:"",password:""})
const [fetc,setFetc]=useState([])
const [error,setErorr]=useState("")
const naviagte=useNavigate()
useEffect(()=>{
axios.get("http://localhost:4000/users")
.then(res=>setFetc(res.data))
.catch(err=>console.error(err));
},[])


let ed=fetc.map((e,i)=>{
    return {id:e.id,name:e.name,pass:e.password,age:e.age,email:e.email,phone:e.phone}
})

function submit(e) {
  e.preventDefault();

  const user = ed.find(u => u.name === data.name && u.pass === data.password);

  if (user) {
    naviagte('/');
    localStorage.setItem("name",user.name)
      localStorage.setItem("password",user.pass)
       localStorage.setItem("age",user.age)
       localStorage.setItem("email",user.email)
       localStorage.setItem("phone",user.phone)
       localStorage.setItem("id",user.id)
        
  } else {
    setErorr("User not found");
  }
}

  function handleChange(e) {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  }


  return (
    <div className='main'>
      <div className='form'>
        <h2>Login</h2>
        <form onSubmit={(e)=>submit(e)}>
          <label htmlFor="name" >name</label>
          <input type="text" id="name" name="name" value={data.name} onChange={(e)=>handleChange(e)}/>

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={data.password}  onChange={(e)=>handleChange(e)}/>

          <button type="submit">Login</button>
          {error ? <p style={{ color: 'red' }}>{error}</p>:<p></p>}

          <p style={{display:"flex",flexDirection:"row", gap:"10px",color:"black",justifyContent:"center"}}>dont have an account ?
            <NavLink style={{textDecoration: "none"}} to={'/register'} replace>SIGN IN</NavLink>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;
