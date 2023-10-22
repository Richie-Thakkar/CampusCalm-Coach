import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Tasks from "./pages/Tasks";
import ShowReports from "./pages/ShowReports";
import MoodTest from "./pages/MoodTest";
import SRQ10 from "./pages/SRQ10";
import PHQ9 from "./pages/PHQ9";
import GAD7 from "./pages/GAD7";
import Consultpsy from "./pages/Consultpsy";
import UseToken from "./components/UseToken";
import ForgotPassword from "./pages/ForgotPassword";
import UserProfile from "./pages/UserProfile";
import CareerTests from "./pages/CareerTests";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import PsyBlog from "./pages/PsyBlog";
import Create_blog from "./pages/Create_blog";
function App() {
  const { token, removeToken, setToken } = UseToken();

  return (
    <BrowserRouter>
      <div className="app-links">
        {!token ? (
          <Login setToken={setToken} />
        ) : (
          <Routes>
            <Route path="/" element={<Login setToken={setToken} />} />
            <Route
              exact
              path="/user/ForgotPassword"
              element={<ForgotPassword token={token} setToken={setToken} />}
            />
            <Route
              exact
              path="/user/home"
              element={<Home token={token} setToken={setToken} />}
            />
            <Route
              exact
              path="/user/aboutUs"
              element={<AboutUs token={token} setToken={setToken} />}
            />
            <Route
              exact
              path="/user/contactUs"
              element={<ContactUs token={token} setToken={setToken} />}
            />
            <Route
              exact
              path="/user/tasks"
              element={<Tasks token={token} setToken={setToken} />}
            />
            <Route
              exact
              path="/user/showReports"
              element={<ShowReports token={token} setToken={setToken} />}
            />
            <Route
              exact
              path="/user/moodTest"
              element={<MoodTest token={token} setToken={setToken} />}
            />
            <Route
              exact
              path="/SRQ10"
              element={<SRQ10 token={token} setToken={setToken} />}
            />
            <Route
              exact
              path="/PHQ9"
              element={<PHQ9 token={token} setToken={setToken} />}
            />
            <Route
              exact
              path="/GAD7"
              element={<GAD7 token={token} setToken={setToken} />}
            />
            <Route
              exact
              path="/user/ConsultPsychiatrist"
              element={<Consultpsy />}
            />
            <Route
              exact
              path="/user/profile"
              element={<UserProfile token={token} setToken={setToken} />}
            />
            <Route
              exact
              path="/user/CareerTests"
              element={<CareerTests token={token} setToken={setToken} />}
            />
            <Route
              exact
              path="/user/Blogs"
              element={<Blogs token={token} setToken={setToken} />}
            />
            <Route
              exact
              path="/user/Blog"
              element={<Blog token={token} setToken={setToken} />}
            />
            <Route
              exact
              path="/psy/PsyBlog"
              element={<PsyBlog token={token} setToken={setToken} />}
            />
            <Route
              exact
              path="/psy/CreateBlog"
              element={<Create_blog token={token} setToken={setToken} />}
            />

          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
