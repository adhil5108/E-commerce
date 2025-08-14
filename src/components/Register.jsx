import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom'
import './register.css'


function Register() {
  const [Data, setData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    password: '',
  })

  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  function handleChange(e) {
    setData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function validate(data) {
    const errors = {}

    if (data.name.length===0) errors.name = 'Name is required'

    if (data.age.length===0) errors.age = 'Age is required'
    else if (data.age * 1 <= 15) errors.age = 'have to be 15 to login '

    if (data.email.length===0) errors.email = 'Email is required'
    else if (!data.email.includes('@') || !data.email.includes('.')) errors.email = 'Invalid email'

    if (data.phone.length===0) errors.phone = 'Phone number is required';
    else if (data.phone.length !== 10) errors.phone = 'Phone number must be exactly 10 digits'

    if (!data.password) errors.password = 'Password is required'
    else if (data.password.length < 6) errors.password = 'Password must be at least 6 characters'

    return errors;
  }

  function submit(e) {
    e.preventDefault()
    const validationErrors = validate(Data)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post('http://localhost:4000/users', Data)
        .then(() => {
          setData({
            name: '',
            age: '',
            email: '',
            phone: '',
            password: '',
          });

        })
        .catch(err => {
          console.log(err);
        });
      navigate('/login')
    }
  }

  return (
    <div className="main">
      <div className="form">
        <h2>Register</h2>
        <form onSubmit={submit} noValidate>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={Data.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}

          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={Data.age}
            onChange={handleChange}
          />
          {errors.age && <p>{errors.age}</p>}

          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={Data.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}

          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={Data.phone}
            onChange={handleChange}
          />
          {errors.phone && <p>{errors.phone}</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={Data.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}

          <button type="submit">Submit</button>
        </form>
        <p style={{ display: "flex", flexDirection: "row", gap: "10px", color: "black", justifyContent: "center" }}>already have an account ?
          <NavLink style={{ textDecoration: "none" }} to={'/login'}>Login</NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;
