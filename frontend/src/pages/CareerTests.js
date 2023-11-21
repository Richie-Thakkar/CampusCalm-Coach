import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import "./CareerTests.css";
function CareerTests()
{
    return (
<>
<Navbar/>
<span className="mtsubheading"style={{"textAlign":"center","marginTop":"3vmax"}}>
After Completing All the tests click on the generate report button to generate your report containing suggested career choices 
</span>
<section className="TestSection">
<NavLink to="/user/career_test/logical_reasoning"><button className="startButton1" style={{ marginTop: '1vmax' }}> Logical Reasoning</button></NavLink>
</section>
<Footer/>
</>
    );
}
export default CareerTests;
