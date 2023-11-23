import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";
import "./Logical_Reasoning.css";

const categories = [
  "calendar",
  "Numbers",
  "Permutation_and_combination",
  "Series",
  // "Time_and_distance",
  "Trains",
];

const NumericalAbility = () => {
  const [questions, setQuestions] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedQuestions = {};

      for (const category of categories) {
        const response = await fetch(`/Arithmetic_Reasoning/${category}.json`);
        const data = await response.json();
        const shuffledQuestions = [...data].sort(() => Math.random() - 0.5);
        const selectedQuestions = shuffledQuestions.slice(0, 5);
        fetchedQuestions[category] = selectedQuestions;
        const questionsWithAnswers = selectedQuestions.map((question) => ({
          ...question,
          answer: question.answer, 
        }));
        fetchedQuestions[category] = questionsWithAnswers;
      }

      setQuestions(fetchedQuestions);
    };

    fetchData();
  }, []);

  const handleAnswerSelection = (category, questionIndex, selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [category]: {
        ...prevAnswers[category],
        [questionIndex]: selectedOption,
      },
    }));
  };

  const calculateScore = () => {
    let calculatedScore = 0;
    console.log(userAnswers);
    for (const category in userAnswers) {
      for (const questionIndex in userAnswers[category]) {
        const selectedOption = userAnswers[category][questionIndex];
        const correctAnswer = questions[category][questionIndex].answer;
        console.log(`Category: ${category}, Question: ${questionIndex}`);
      console.log(`Selected Option: ${selectedOption}`);
      console.log(`Correct Answer: ${correctAnswer}`);

      const optionIndex = questions[category][questionIndex].options.indexOf(selectedOption);
      const correctAnswerChar = String.fromCharCode(97 + optionIndex); // 'a' corresponds to 97 in ASCII
      console.log(`Correct Answer Char: ${correctAnswerChar}`);
      if (correctAnswerChar === correctAnswer) {
        calculatedScore++;
      }
      }
    }
    setScore(calculatedScore);
    setShowResults(true);
    console.log(score)
    sessionStorage.setItem("AR_Score",calculatedScore);
          
  };
  
  return (
    <>
      <Navbar />
      <div id="container">
        <h1 id="Header">Arithmetic Reasoning Test</h1>
        {categories.map((category) => (
          <div key={category}>
            <h2 className="section-title">{category}</h2>
            {questions[category] &&
              questions[category].map((question, index) => (
                <div key={index}>
                  <h3 className="question-title">Question {index + 1}:</h3>
                  <p className="question-text">{question.question}</p>
                  <ul className="answer-options"          >
                    {question.options.map((option, optionIndex) => (
                        <label>
                          <input
                            type="radio"
                            name={`${category}-${index}`}
                            value={option}
                            className="answer-option"
                            onChange={() =>
                              handleAnswerSelection(category, index, option)
                            }
                            disabled={showResults}
                          />
                          {option}
                        <p>{question.answer}</p>  
                        </label>
                        
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        ))}
        {showResults ? (
          <div className='btdiv'><NavLink to='/user/career_test/verbal_ability'><button type='submit' className='startButton'>Go to next Assesment</button></NavLink></div>
        ) : (
          <div className='btdiv'><button className='startButton' onClick={calculateScore}>Submit Test</button></div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NumericalAbility;
