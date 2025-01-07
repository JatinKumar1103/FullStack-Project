import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';

const Header = () => {
  const navigate = useNavigate();
  const[userData, setUserData] = useState();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      const res = await axios.get('http://localhost:4000/api/v1/user/userinfo',
         {withCredentials: true})
      setUserData(res.data.data.user);
    };
    
    fetchUserDetails();
  },[])
  const logoutHandler = async() => {
    
    const res = await axios.post('http://localhost:4000/api/v1/user/logout',
      {},
      {withCredentials:true})
    console.log(res);
        dispatch(authActions.logout());
        navigate("/");
  }
  return (
   <>
   {
    userData &&  <div className='bg-green-900 rounded py-8 flex flex-col md:flex-row items-center justify-center gap-4 md:justify-between px-4 lg:px-12'>
    <div className='flex flex-col items-center md:items-start'>
    <p className='text-zinc-300'>Profile</p>
    <h2 className='text-3xl md:text-4xl lg:text-5xl text-zinc-100 font-bold text-center'>
        Welcome, {userData.username}
    </h2>
    <p className='text-zinc-300 mt-1'>
        {userData.email}
    </p>
    </div>
  
  <div>
    <button className='bg-white px-4 py-2 rounded text-zinc-800 font-semibold hover:shadow-xl transition-all duration-300' onClick={logoutHandler}>Logout</button>
  </div>
</div>
   }
   </>
  )
}

export default Header
