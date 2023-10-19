import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState,useEffect } from "react";
import "./UserProfile.css";
function UserProfile()
{
    /*function convertDateFormat(oldDate) {
        const date = new Date(oldDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      */
    const [details, setDetails] = useState([]);
    const [newDetails, setNewDetails] = useState({});
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/getUserDetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
          },
          credentials: 'include',
          body: JSON.stringify({ Email_ID: sessionStorage.getItem("email") }),
        })
          .then((response) => response.json())
          .then((data) => setDetails(data));
      }, []);
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewDetails({ ...newDetails, [name]: value });
      };
    
      const handleUpdateProfile = (event) => {
        event.preventDefault(); // Prevent the default form submission
      
        //const newFormattedDOB = convertDateFormat(newDetails.DOB);
      
        // Combine the new details with the existing details
        const updatedDetails = {
            Email_ID: newDetails.Email_ID || details[0][0],
            FirstName: newDetails.FirstName || details[0][1],
            LastName: newDetails.LastName || details[0][2],
            Institution: newDetails.Institution || details[0][4],
            Class: newDetails.Class || details[0][5],
            Stream: newDetails.Stream || details[0][6],
            Specialty: newDetails.Specialty || details[0][7],
          };
          
          console.log("newDetails:", newDetails);
console.log("details[0]:", details[0][1]);

      //console.log(updatedDetails);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/updateUserDetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedDetails),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          });
      };
          
    
return (
    <>
    <Navbar />
    <div className='stu-prf'>  
                <div className='stu-prf-container'>
                    <form>
                    <div className='stu-prf-header'>
                        <div className='stu-prf-info'>
                            <img src="https://cdn.pixabay.com/photo/2016/11/29/13/56/asian-1870022_640.jpg" alt="img" />
                        </div>
                        </div>
                        {details.map((p) => (
                    <div className='stu-prf-main' key={p[0]}>
                        <div className='stu-prf-main-left'>
                        <div className='stu-prf-list'>
                                <div className='stu-prf-list-head'>
                                    <p>First Name</p>
                                </div>
                                <div className='stu-prf-list-det'>
                                    <input
              type="text"
              name="FirstName"
              placeholder="FirstName"
              value={(newDetails.FirstName) || (p[1])}
              className="input-field"
              onChange={handleInputChange} required/>
                                </div>
                                </div>
                                <div className='stu-prf-list'>
                                <div className='stu-prf-list-head'>
                                    <p>Last Name</p>
                                </div>
                                <div className='stu-prf-list-det'>
                                    <input
              type="text"
              name="LastName"
              placeholder="LastName"
              className="input-field"
              value={(newDetails.LastName) || (p[2])}
              onChange={handleInputChange} required/>
                                </div>
                            
                            </div>
                            
                            <div className='stu-prf-list'>
                                <div className='stu-prf-list-head'>
                                    <p>Email</p>
                                </div>
                                <div className='stu-prf-list-det'>
                                <input
              type="text"
              name="Email_ID"
              placeholder="Email Address"
              className="input-field"
              value={newDetails.Email_ID || p[0]}
              onChange={handleInputChange} required/>
                                   
                                   </div>
                            </div>
                            
                        </div>
                        <div className='stu-prf-main-right'>
                            <div className='stu-prf-list'>
                                <div className='stu-prf-list-head'>
                                    <p>Current Class</p>
                                </div>
                                <div className='stu-prf-list-det'>
                                <input
              type="text"
              name="Class"
              placeholder="Class"
              className="input-field"
              value={newDetails.Class || p[5]}
              onChange={handleInputChange} required/>
              
                                 </div>
                            </div><div className='stu-prf-list'>
                                <div className='stu-prf-list-head'>
                                    <p>Stream</p>
                                </div>
                                <div className='stu-prf-list-det'>
                                <input
              type="text"
              name="Stream"
              className="input-field"
              placeholder="Stream"
              value={newDetails.Stream || p[6]}
              onChange={handleInputChange} required/>
             
                                </div>
                            </div><div className='stu-prf-list'>
                                <div className='stu-prf-list-head'>
                                    <p>Specialty</p>
                                </div>
                                <div className='stu-prf-list-det'>
                                <input
              type="text"
              name="Specialty"
              placeholder="Specialty"
              className="input-field"
              value={newDetails.Specialty || p[7]}
              onChange={handleInputChange} required/>
             
                                      </div>
                            </div>
                            <div className='stu-prf-list'>
                                <div className='stu-prf-list-head'>
                                    <p>Institution</p>
                                </div>
                                <div className='stu-prf-list-det'>
                                <input
              type="text"
              name="Institution"
              placeholder="Institution"
              className="input-field"
              value={newDetails.Institution || p[4]}
              onChange={handleInputChange} required/>
                 
                                 </div>
                            </div>
                        </div>
                        
                    </div>
                    ))}
                    <div className="upsect">
                    <button className="startButton" onClick={handleUpdateProfile} style={{ marginTop: '10vh' }}>
            Update
          </button>
          </div>
          </form>
                </div>
            </div>

    <Footer />
    </>
);
}
export default UserProfile;