import React from "react";
import plan from "../assets/img_cleanup.jpeg";
import Newarrivals from './newarrivals'
import Navbar from "./navbar";

function Home() {
  return (
    <>
    <Navbar/>
    <div>
      <img
        src={plan} 
        alt="cover"
        style={{ width: "100%", height: "93vh",marginTop:"60px" }}/>
    </div>
    <Newarrivals/>
    </>
  )
}



export default Home;
