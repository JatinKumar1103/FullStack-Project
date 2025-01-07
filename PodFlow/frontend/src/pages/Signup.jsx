import React ,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useSelector } from "react-redux";
import ErrorPage from "./ErrorPage";
import { authActions } from "../store/auth";

const Signup = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username:"",
    email:"",
    password:""
  });
  const change = (e) => {
    const {name, value} =  e.target;
    setValues({
      ...values,
      [name]:value
    })
  };
  const handleSubmit = async() => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/signup",
        values,
        
      );
      navigate("/login")
      toast.success(res.data.message)
      
      
    } catch (error) {
      const errorMessage = error.response?.data.match(/Error: (.*?)<br>/)?.[1];
      if (errorMessage) {
          toast.error(errorMessage);
      } else {
          toast.error('An unexpected error occurred');
      }
}
    
  };
  return (
    <>{isLoggedIn ? <ErrorPage/> : <div className="h-screen bg-green-100 flex items-center justify-center">
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition: Bounce/>

      <div className="w-4/6 md:w-3/6 lg:w-2/6  flex flex-col items-center justify-center">
        <Link to="/" className="text-2xl font-bold">
          PodFlow
        </Link>
        <div className="mt-6 w-full">
          <div className="w-full flex flex-col">
            <label htmlFor="">Username</label>
            <input
              type="text"
              className="mt-2 px-2 py-2 rounded outline-none border border-black"
              required
              placeholder="Username"
              name="username"
              value={values.username}
              onChange={change}
            />
          </div>
          <div className="w-full flex flex-col mt-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              className="mt-2 px-2 py-2 rounded outline-none border border-black"
              required
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={change}
            />
          </div>
          <div className="w-full flex flex-col mt-2">
            <label htmlFor="">Password</label>
            <input
              type="password"
              className="mt-2 px-2 py-2 rounded outline-none border border-black"
              required
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={change}
            />
          </div>
          <div className="w-full flex flex-col mt-4">
           <button 
           className="bg-green-900 font-semibold text-xl text-white rounded py-2"
           onClick={handleSubmit}
           >Signup</button>
          </div>

          <div className="w-full flex flex-col mt-4">
           <p className="text-center">Already have an account?<Link to="/login" className="font-semibold hover:text-blue-600">Login</Link> </p>
          </div>

        </div>
      </div>
    </div>}</>
  );
};

export default Signup;
