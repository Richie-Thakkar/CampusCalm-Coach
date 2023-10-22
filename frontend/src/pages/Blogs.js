import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useEffect ,useState } from "react"
import "./Consultpsy.css"
import "./Blog.css"
import { NavLink } from "react-router-dom"

function Blogs() {
    const [post,setPost] = useState([])
    
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
        .then((data) => {setPost(data);console.log(data);})
    // title , author , date of publish , tags, description , SubTitle, body , image 
    // mysql table : CREATE TABLE BLOGS (Blog_id,Title,Author,Publication_date,Description of blog,Blog body,Image for the blog);
    },[])
    return(
        <div>
            <Navbar />
            <div className="psyinfowrapper">
          {post.map((p) => (
            <div className="psyinfo" >
              <div className="pdata">
                <img src={`data:image/png;base64,${p[7]}`} alt="Image" className="psyimg"/>
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
                  <NavLink
                    to="/user/Blog"
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
            <Footer />
        </div>
    )
}

export default Blogs