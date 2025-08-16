import React from "react";
import Footer from "./Footer";
import Navbar from './navbar'
function About ()  {


  return (
    <>
    <Navbar/>
    <section>
    <div style= {{maxWidth: "800px",
      margin: "140px auto",
      background: "#fff",
      padding: "40px 30px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      borderRadius: "12px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#222",
      lineHeight: 1.6}}>
      <h1 style={{fontWeight: 700,
      fontSize: "2.8rem",
      color: "#1a1a1a",
      marginBottom: "10px",
      textAlign: "center",
      fontFamily: "'Georgia', serif"}}>Welcome to Time Lux — Where Every Second Counts</h1>
      <p style={{   fontSize: "1.1rem", color: "#555",}}>
        At Time Lux, we don’t just sell watches; we celebrate the art of timekeeping. Our
        collection features handpicked premium watches from world-renowned brands and
        exclusive artisans, designed for those who appreciate precision, craftsmanship, and
        timeless style.
      </p>

      <h2 style={{ fontWeight: 600,
      color: "#444",
      marginTop: "40px",
      marginBottom: "15px",
      borderBottom: "2px solid #e2b13c",
      paddingBottom: "6px",
      fontFamily: "'Georgia', serif",}}>Why Time Lux?</h2>
      <ul style={{ color: "#555", fontSize: "1.1rem", paddingLeft: "20px" }}>
        <li><strong style={{color:"grey"}}>Curated Excellence:</strong> We bring you only the finest watches that blend heritage, innovation, and elegance.</li>
        <li><strong style={{color:"grey"}}>Authenticity Guaranteed:</strong> Every watch in our collection is 100% authentic, backed by warranties and meticulous quality checks.</li>
        <li><strong style={{color:"grey"}}>Tailored for You:</strong> Whether you're a seasoned collector or searching for that perfect gift, Time Lux offers personalized recommendations to match your style and story.</li>
        <li><strong style={{color:"grey"}}>Beyond Timekeeping:</strong> More than just accessories, our watches are symbols of achievement, milestones, and unforgettable moments.</li>
      </ul>

      <h2 style={{ fontWeight: 600,
      color: "#444",
      marginTop: "40px",
      marginBottom: "15px",
      borderBottom: "2px solid #e2b13c", 
      paddingBottom: "6px",
      fontFamily: "'Georgia', serif",}}>Our Promise</h2>
      <p style={{fontSize: "1.1rem",
      color: "#555",}}>
        We believe time is the most valuable thing you own. That’s why at Time Lux, we commit to
        delivering not only exquisite watches but also an exceptional shopping experience —
        with expert guidance, seamless service, and aftercare you can trust.
      </p>

      <p style={{ fontSize: "1.1rem",
      color: "#555", fontWeight: "600", marginTop: "30px", textAlign: "center" }}>
        Join the Time Lux family and wear more than just a watch. Wear a legacy.
      </p>
    
    </div>
   
    </section>
     <Footer/>
    </>
  );
};

export default About
