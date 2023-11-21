import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import UseToken from "../components/UseToken";
import "./AdminDashboard.css"
function AB() {
    const [post,setPost] = useState([])
    const handleBlogDelete = (id) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/deleteBlog`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({ Id: id }), // Sending the email of the user to be deleted
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "success") {
              alert("Deleted Blog succesfully");
              window.location.reload();
            } else {
              alert("Deletion Unsuccessful... Please try again later");
              // console.error("Deletion failed");
            }
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
          });
      };
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/getPost`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Authorization:"Bearer" + sessionStorage.getItem("token"),
            },
            credentials: 'include',
        })
        .then((response) => response.json())
        .then((data) => {setPost(data);})
    // title , author , date of publish , tags, description , SubTitle, body , image 
    // mysql table : CREATE TABLE BLOGS (Blog_id,Title,Author,Publication_date,Description of blog,Blog body,Image for the blog);
    },[])
    return(
        <div>
            <AdminNavbar />
            <div className="psyinfowrapper">
        {post && post.length > 0 ? (
          post.map((p) => (
            <div className="psyinfo" key={p[0]}>
              <div className="pdata">
                <img
                  src={`data:image/png;base64,${p[7]}`}
                  className="psyimg"
                  onError={(e) => {
                    e.target.src = 'https://cdn.pixabay.com/photo/2022/06/24/17/35/relaxation-7282116_1280.jpg'; // Replace with the path to your fallback image
                  }}
                />
                <div className="inf">
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
                    <NavLink to="/admin/adminblog" state={{ p: p }} exact>
                      <button className="searchbtn">Read</button>
                    </NavLink>
                  </span>
                  {/* <span className="item6" onClick={handleBlogDelete(p[0])}>
            <button className="blogdeletebtn">Delete</button>
                    </span>  */}
                    <span className="item6" onClick={() => handleBlogDelete(p[0])}>
  <button className="blogdeletebtn">Delete</button>
</span>

                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="norep">
            <span style={{ "fontSize": "6vh" }}>No Blogs found</span>
          </div>
        )}
      </div>

            <Footer />
        </div>
    )
}
 
export default AB;
