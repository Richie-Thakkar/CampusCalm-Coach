import React from "react";
import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer"
import "./Blog.css"
function AdminBlog(){
    const location = useLocation()
    const {p} = location.state
    console.log(p);
    const [sentiment,setSentiment] = useState('')
    useEffect(() => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/getSentiment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        credentials: 'include',
        body: JSON.stringify({ message: p[4] }),
      })
        .then((response) => response.json())
        .then((data) => setSentiment(data['sentiment']));
    }, []);
    return(
        <section className="blogsect"> 
            <AdminNavbar />
            <section>
                <h1>{p[0]}</h1>
                <div className="author">
                    <h3>By {p[1]}</h3>
                    <h3>| Published on {p[2]} </h3>
                </div>
            </section>
            <div className="tag">{p[3]}</div>
            <br></br>
            <div className="desc">
                <h2>Description</h2>
            </div>
            <div className="content">
                {p[4]}
            </div>
            <br></br>
            <div className="desc">
                <h2>{p[5]}</h2>
            </div>
            <div className="content">
                {p[6]}
            </div>
            <div className="desc" style={{fontWeight:"bolder"}}>
                {sentiment}
            </div>
            <Footer />
        </section>
    )
}
export default AdminBlog