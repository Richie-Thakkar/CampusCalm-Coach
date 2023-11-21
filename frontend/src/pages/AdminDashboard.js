import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import UseToken from "../components/UseToken";
import "./AdminDashboard.css"
function AD() {
  const [users, setUsers] = useState([]);
  const { token } = UseToken(); // Assuming UseToken() returns an object with a 'token' property

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/getUsers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleDelete = (email) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/deleteUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ Email_Id: email }), // Sending the email of the user to be deleted
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Deleted User succesfully");
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
  return (
    <>
      <AdminNavbar />
      <div className="reports">
        {users && users.length > 0 ? (
          users.map((user) => (
            <div className="report" key={user[0]}>
              <p><b>First Name:</b><br/> <span>{user[1]}</span></p>
              <p><b>Last Name:</b><br/> <span>{user[2]}</span></p>
              <p><b>Email:</b><br/> <span>{user[0]}</span></p>
              <p><b>Institution:</b><br/> <span>{user[4]}</span></p>
              <p><b>Class:</b><br/> <span>{user[5]}</span></p>
              <p><b>Stream:</b><br/> <span>{user[6]}</span></p>
              <p><b>Specialty:</b><br/> <span>{user[7]}</span></p>
              <p><b>DOB:</b><br/> <span>{user[8]}</span></p>
              <p><b>User_Type:</b><br/> <span>{user[10]===0?"Normal User":"Admin"}</span></p>
              {user[10]===0?(<p className="buttonlocator"  onClick={() => handleDelete(user[0])}><button class="deletebtn btn-delete">
  <span class="mdi mdi-delete mdi-24px"></span>
  <span class="mdi mdi-delete-empty mdi-24px"></span>
  <span>Delete User</span>
</button>  </p>):<p className="buttonlocator"><button class="deletebtn btn-delete">
  <span class="mdi mdi-delete mdi-24px"></span>
  <span class="mdi mdi-delete-empty mdi-24px"></span>
  <span>Cannot Delete Admin</span>
</button>  </p>}
              
            </div>
          ))
        ) : (
          <div className="norep">
            <span style={{ "fontSize": "6vh" }}>No Users found</span>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default AD;
