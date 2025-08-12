
import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from './Footer'
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";


function Brands() {
    let [data, setData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:4000/products")
            .then(res => setData(res.data))
            .catch(err => console.error(err))
    }, [])

    let navigate=useNavigate()

    let data2 = data.filter(u => u.id==14||u.id == 10|| u.id == 22)
        .map(u => {
            return {
                img: u.image,
                name: u.title,
                des: u.description,
                brand:u.brand,
                price: u.price
            }
        })

        function onclick(){
          navigate('/allcollection')
        }

    return (
        <><Navbar/>
        <section style={{ marginTop: "100px", display: "flex", flexDirection: "column" }}>
            <h1 style={{ display: "flex", justifyContent: "center", fontSize: "50px", fontWeight: "100", fontFamily: "inherit" }}>Brands</h1>


            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center"
            }}>
                {data2.map((e, i) => {
                    return <div key={i} style={{ backgroundColor: "white", height: "400px", width: "400px", display: "flex", flexDirection: "column", margin: "30px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", borderRadius: "10px" }}>
                        <img src={e.img} alt="" style={{ width: "360px", margin: "20px", height: "200px", marginBottom: "0px", borderRadius: "5px" }} />
                        <h2 style={{ display: "flex", margin: "40px auto 0px" }}> {e.brand} </h2>
                        <h4 style={{ margin: "30px auto ", color: "black" }}>{e.name} </h4>
                        <button className="shopnoww" style={{ marginTop: "8px", padding: "10px 0px", backgroundColor: "#070707ff", color: "white", border: "none", borderRadius: "5px", fontWeight: "bold", cursor: "pointer", transition: "0.3s ease", width: "120px", alignSelf: "center"  }} onClick={onclick}>
                           See more
                        </button>
                        

                    </div>
                })}
            </div>



<Footer/>
        </section>
        </>
    )
}
export default Brands