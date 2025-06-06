import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Categories from "./pages/Categories.jsx";
import Home from "./pages/Home";
import Profile from "./pages/Profile.jsx";
import AddPodcast from "./pages/AddPodcast";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth.js";
import AllPodcasts from "./pages/AllPodcasts.jsx";
import CategoriesPages from "./pages/CategoriesPages.jsx";
import Description from "./pages/Description.jsx";


const App = () => {
  const dispatch = useDispatch();
  useEffect(() =>{
    const fetch = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/v1/user/checkcookie',{withCredentials:true})
        if(res.data.data.message){
          dispatch(authActions.login())
        }
      }
      catch (error) {
        // console.log(error)
      }
      }
      fetch()
  },[])
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-podcast" element={<AddPodcast />} />
            <Route path="/all-podcasts" element={<AllPodcasts />} />
            <Route path="/categories/:cat" element={<CategoriesPages />} />
            <Route path="/description/:id" element={<Description />} />

          </Route>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
