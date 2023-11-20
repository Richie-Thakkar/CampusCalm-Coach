import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MoodTest.css";
import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function PHQ9(){
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const handleOptionSelect = (questionId, option) => {
    setSelectedOptions((prevSelectedOptions) => ([
      ...prevSelectedOptions,
      option,
    ]));
  };
  const calculateScore = () => {
    console.log(selectedOptions)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/likes`,{
	method: "POST",
	headers:{
		"Content-Type": "application/json",
		Authorization:"Bearer" + sessionStorage.getItem("token"),
	},
	body: JSON.stringify(selectedOptions),
	credentials: 'include',
    })
	  .then((data) => {console.log(data);sessionStorage.setItem("career",data)})
	.catch((error) => console.error(error))
  };
  
    const questions = [
        {
        id: 1,
        question: "English",
        options: [1, 2, 3,4,5],
        },
        {
        id: 2,
        question: "Regional Language",
        options: [1, 2, 3,4,5],
        },
        {
        id: 3,
        question: "Hindi",
        options: [1, 2, 3,4,5],
        },
        {
        id: 4,
        question: "Computer Science",
        options: [1, 2, 3,4,5],
        },
        {
        id: 5,
        question: "History",
        options: [1, 2, 3,4,5],
        },
        {
        id: 6,
        question: "Geography",
        options: [1, 2, 3,4,5],
        },
        {
        id: 7,
        question: "Political Science",
        options: [1, 2, 3,4,5],
        },
        {
        id: 8,
        question: "Economics",
        options: [1, 2, 3,4,5],
        },
        {
        id: 9,
        question: "Physics",
        options: [1, 2, 3,4,5],
        },
                 {
        id: 10,
        question: "Chemistry",
        options: [1, 2, 3,4,5],
        },{
        id: 11,
        question: "Maths",
        options: [1, 2, 3,4,5],
        },{
        id: 12,
        question: "Biology",
        options: [1, 2, 3,4,5],
        },{
        id: 13,
        question: "Art",
        options: [1, 2, 3,4,5],
        },{
        id: 14,
        question: "Environmental Science",
        options: [1, 2, 3,4,5],
        },{
        id: 15,
        question: "Fashion Design",
        options: [1, 2, 3,4,5],
        },{
        id: 16,
        question: "Foreign Language",
        options: [1, 2, 3,4,5],
        },{
        id: 17,
        question: "Physical Education (Sports)",
        options: [1, 2, 3,4,5],
        },{
        id: 18,
        question: "Technical Drawing",
        options: [1, 2, 3,4,5],
        },{
        id: 19,
        question: "Religious Studies",
        options: [1, 2, 3,4,5],
        },{
        id: 20,
        question: "Accounting",
        options: [1, 2, 3,4,5],
        },{
        id: 21,
        question: "Agriculture",
        options: [1, 2, 3,4,5],
        },{
        id: 22,
        question: "Psychology",
        options: [1, 2, 3,4,5],
        },{
        id: 23,
        question: "Accountancy",
        options: [1, 2, 3,4,5],
        },{
        id: 24,
        question: "Philosophy",
        options: [1, 2, 3,4,5],
        },{
        id: 25,
        question: "Biotechnology",
        options: [1, 2, 3,4,5],
        },{
        id: 26,
        question: "Thermodynamics",
        options: [1, 2, 3,4,5],
        },     {
        id: 27,
        question: "Organic Chemistry",
        options: [1, 2, 3,4,5],
        },{
        id: 28,
        question: "Electrostatics",
        options: [1, 2, 3,4,5],
        },{
        id: 29,
        question: "Newtonian Physics",
        options: [1, 2, 3,4,5],
        },{
        id: 30,
        question: "Atomic and Nuclear Physics",
        options: [1, 2, 3,4,5],
        },{
        id: 31,
        question: "Engineering Drawing",
        options: [1, 2, 3,4,5],
        },   {
        id: 32,
        question: "Statistics",
        options: [1, 2, 3,4,5],
        },{
        id: 33,
        question: "Company Law",
        options: [1, 2, 3,4,5],
        },{
        id: 34,
        question: "Home Science",
        options: [1, 2, 3,4,5],
        },
        ];
      
    return(
        <section className="mtestsect">
    <Navbar/>
    <span className="mtheading">Likes and Dislikes</span>
<span className="mtsubheading">The ratings to be given are as follows: 1: - Not at all 5: - Most interested</span>
<div className="quiz">
        {questions.map((q) => (
          <div key={q.id} className="srqdiv">
            <p className="srqques">{q.question}</p>
            <div className="options">
              {q.options.map((option, index) => (
                <React.Fragment key={index}>
                  <label htmlFor={`${q.id}-${index}`} className="qlabel">
                    {option}
                  </label>
                  <input type="radio" name={`opt-${q.id}`} value={option} id={`${q.id}-${index}`} onChange={() => handleOptionSelect(q.id, option)}/>
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{"display":"flex","justifyContent":"center"}}>
      <NavLink to="/user/CareerTests"><button className="startButton" style={{"marginTop":"1vmax"}} disabled={Object.keys(selectedOptions).length !== questions.length} onClick={calculateScore}>Submit</button></NavLink>
  </div>
  <Footer/>
        </section>
    )
}
export default PHQ9
