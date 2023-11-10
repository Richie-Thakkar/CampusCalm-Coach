import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Logical_Reasoning.css";

function Memory()
{
    return(
        <>
        <Navbar/>
        <div className="flexwrapper">
        <iframe src="https://practicalpie.com/free-memory-test/#memorytest" frameborder="100" className="memoryquiz"></iframe>
        </div>
		 <div className='btdiv'><NavLink to='/user/career_test/verbal_ability'><button type='submit' className='startButton'>Go to next Assesment</button></NavLink></div>
        <Footer/>
        </>
    )
}
export default Memory;
