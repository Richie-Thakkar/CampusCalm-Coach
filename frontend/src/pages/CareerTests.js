import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
<button className="startButton1" style={{ marginTop: '1vmax' }}> Likes/Dislikes</button>
<button className="startButton1" style={{ marginTop: '1vmax' }}> Likes/Dislikes</button>
<button className="startButton1" style={{ marginTop: '1vmax' }}> Likes/Dislikes</button>
<button className="startButton1" style={{ marginTop: '1vmax' }}> Likes/Dislikes</button>
<button className="startButton1" style={{ marginTop: '1vmax' }}> Likes/Dislikes</button>
<button className="startButton1" style={{ marginTop: '1vmax' }}> Likes/Dislikes</button>
<button className="startButton1" style={{ marginTop: '1vmax' }}> Likes/Dislikes</button>
<button className="startButton1" style={{ marginTop: '1vmax' }}> Likes/Dislikes</button>
</section>
<Footer/>
</>
    );
}
export default CareerTests;