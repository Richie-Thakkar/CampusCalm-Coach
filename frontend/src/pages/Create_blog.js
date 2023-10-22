import React from "react";
import { useState, useEffect } from "react";
import "./Blog.css"
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import PsyNav from "../components/Navbar_psy";

function Create_blog(){
    const [post,setPost] = useState([])
    
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/getPost`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            credentials: 'include',
        })
        .then((response) => response.json())
        .then((data) => setPost(data))
    // title , author , date of publish , tags, description , SubTitle, body , image 
    // mysql table : CREATE TABLE BLOGS (Blog_id,Title,Author,Publication_date,Description of blog,Blog body,Image for the blog);
    },[])
    return (
        <div>
            <PsyNav />
            <div className="psyinfowrapper">
          {post.map((p) => (
            <div className="psyinfo" >
              <div className="pdata">
                <div>{p[7]}</div>
                <div className="inf">
                  <span className="item1">
                    <b>{p[0]}</b>
                  </span>
                  <span className="item2">
                  <p>{p[3]}</p>
                  </span>
                  <span className="item3">
                  <p>Written by:</p>&nbsp;{p[1]}
                  </span>
                  <span className="item4">
                  <p>{p[2]}</p>
                </span>
                <span className="item5">
                  <NavLink
                    to="/blog"
                    state={{p:p}}
                    exact>
                  <button className="searchbtn">
                    Read
                  </button>
                  </NavLink>
                </span>
                </div>
              </div>
              </div>
            ))}
          </div>
            <NavLink
            to="/psy/blogCreate"
            exact>
                <button className="searchbtn">
                    Add new Blog
                </button>
            </NavLink>
        <Footer />
        </div>
    )
}

export default Create_blog