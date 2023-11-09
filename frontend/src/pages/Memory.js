import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Memory()
{
    return(
        <>
        <Navbar/>
        <div className="flexwrapper">
        <iframe src="https://practicalpie.com/free-memory-test/#memorytest" frameborder="100" className="memoryquiz"></iframe>
        </div>
        <Footer/>
        </>
    )
}
export default Memory;