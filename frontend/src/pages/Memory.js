import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Logical_Reasoning.css";
import {NavLink} from "react-router-dom";
import {useState } from "react";

function Memory()
{
	const [mem,setMem] = useState(0)
	const AR_Score = sessionStorage.getItem("AR_Score")
	const LR_Score = sessionStorage.getItem("LR_Score")
	const VA_Score = sessionStorage.getItem("VA_Score")
	const report = {LR_Score,AR_Score,VA_Score,mem}
    return(
        <>
        <Navbar/>
        <div className="flexwrapper">
        <iframe src="https://practicalpie.com/free-memory-test/#memorytest" frameborder="100" className="memoryquiz"></iframe>
        </div>
	      <input
            type="text"
            placeholder="Give your Score..."
            value={mem}
            onChange={(e) => setMem(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
 	fetch(`${process.env.REACT_APP_BACKEND_URL}/career`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Authorization:"Bearer" + sessionStorage.getItem("token"),
            },
                body: JSON.stringify(report),
            credentials: 'include',
        })
        .catch((error) => console.error(error))

              }
            }}
          />

		 <div className='btdiv'><NavLink to='/user/moodTest'><button type='submit' className='startButton'>Go to next Assesment</button></NavLink></div>
        <Footer/>
        </>
    )
}
export default Memory;
