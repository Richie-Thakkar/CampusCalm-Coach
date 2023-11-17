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
<NavLink to="/user/career_test/arithmetic_reasoning"><button className="startButton1" style={{ marginTop: '1vmax' }}> Arithmetic Reasoning</button></NavLink>
<NavLink to="/user/career_test/verbal_ability"><button className="startButton1" style={{ marginTop: '1vmax' }}> Verbal Ability</button></NavLink>
<NavLink to="/user/career_test/Memory"><button className="startButton1" style={{ marginTop: '1vmax' }}> Memory</button></NavLink>
<NavLink to="/user/career_test/likes"><button className="startButton1" style={{ marginTop: '1vmax' }}> Likes/Dislikes</button></NavLink>
</section>
<Footer/>
</>
    );
}
export default CareerTests;
