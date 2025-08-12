import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar'
function Profile() {
    let navigate=useNavigate()
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');
  const age = localStorage.getItem('age');
  const phone = localStorage.getItem('phone');

  function logout() {
    localStorage.clear();
    navigate('/login')
  }

  return (
    <>
    <Navbar/>
    <div style={{marginTop:"150px"}}>
    <div
      style={{
        maxWidth: '400px',
      
        margin: '2rem auto',
        padding: '1.5rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#fafafa',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '1rem',
          color: '#333',
        }}
      >
        Your Profile
      </h2>

      {(name || email || age || phone) && (
        <div
          style={{
            lineHeight: '1.6',
            fontSize: '1.1rem',
          }}
        >
          <p>
            <strong>Name:</strong> {name || 'Not set'}
          </p>
          <p>
            <strong>Email:</strong> {email || 'Not set'}
          </p>
          <p>
            <strong>Age:</strong> {age || 'Not set'}
          </p>
          <p>
            <strong>Phone:</strong> {phone || 'Not set'}
          </p>
        </div>
      )}

      <button
        onClick={logout}
        style={{
          marginTop: '1.5rem',
          width: '30%',
          padding: '0.75rem',
          backgroundColor: '#fdfdfdff',
          color: '#111111ff',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          margin: '1.5rem 130px'

        }}
      >
        Log out
      </button>
    </div>
    </div>
    </>
  );
}

export default Profile;
