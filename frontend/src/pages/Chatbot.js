import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./chatbot.css";

function Chatbot() {
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUserMessage = async () => {
    if (userInput.trim() === "") {
      return;
    }

    // Display the loading indicator
    setIsLoading(true);

    // Add the user message to the chatMessages state
    setChatMessages((prevMessages) => [...prevMessages, { role: "user", content: userInput }]);

    // Send the user message to the Flask backend
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/chatbot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (response.ok) {
        const data = await response.json();
        // Add the chatbot's response to the chatMessages state
        setChatMessages((prevMessages) => [...prevMessages, { role: "bot", content: data.bot_response }]);
        setUserInput("");
      } else {
        console.error("Failed to get a response from the server.");
      }
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
    } finally {
      // Hide the loading indicator
      setIsLoading(false);
    }
  };

  return (
    <section className="chatbot-container">
      <Navbar />
      <div className="chatbot">
        <div className="chatbot-message">
        Hello, I am Gyanibot, your supportive companion on your mental health journey. How can I assist you today?
        </div> 
        <div className="chatbot-messages">
  {chatMessages.map((message, index) => (
    <div key={index} className={`${message.role}`}>
      <div
        className={`message-content ${message.role === "user" ? "user-message" : "chatbot-message"}`}
      >
        {message.content}
      </div>
    </div>
  ))}
  {isLoading && <div className="loading-indicator">Loading...</div>}
</div>

        <div className="chatbot-input">
          <input
            type="text"
            placeholder="Type your message..."
            className="input-field"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleUserMessage();
              }
            }}
          />
          <button className="send-button" onClick={handleUserMessage}>
            Send
          </button>
                  </div>
      </div>
      <Footer />
    </section>
  );
}

export default Chatbot;
