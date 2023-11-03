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
                            <img src="data:image/jpeg;base64,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" alt="img"/>
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