import React, { useContext, useState } from 'react'
import Logo from '../assets/maxlogo.png';
import google from '../assets/googlelogo.png'
import { useNavigate } from 'react-router-dom';
import { IoEye } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import {authDataContext} from '../context/AuthContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';

const Signup = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const {serverUrl} = useContext(authDataContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {getCurrentUser, userData} = useContext(userDataContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(serverUrl + '/api/auth/signup', {
        name, email, password
      },{withCredentials : true});

      console.log(result.data);
      getCurrentUser();
      navigate("/");
    
    } catch (error) {
      console.log(error);
    }
  }


  const googleSignUp = async () => {
    try {
      const response = await signInWithPopup(auth,provider);
      console.log(response);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;

      const result = await axios.post(serverUrl + "/api/auth/googlelogin", {
        name, email}, {withCredentials: true})
      
      getCurrentUser();
      navigate("/"); 

    } catch (error) {
      console.log(error.message)
    }
  }


  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
      <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer'>
        <img src={Logo} alt="Logo" className='w-[40px]' onClick={() => navigate("/")} />
        <h1 className='text-[22px] font-sans' onClick={() => navigate("/")} >Maxx</h1>
      </div>
      <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
        <span className='text-[25px] font-semibold'>SignUp Page</span>
        <span className='text-[16px]'>Welocome to Maxx, Place your order</span>
      </div>
      <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
        <form action="" onSubmit={handleSignup} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
          <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googleSignUp} >
            <img src={google} alt="" className='w-[20px]' />Login with Google
          </div>
          <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
            <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
          </div>
          <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
            <input type="text" placeholder='UserName' required onChange={(e)=> setName(e.target.value)} value={name} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder:[#ffffffc7] px-[20px] font-semibold' />
            <input type="text" placeholder='Email' required onChange={(e)=> setEmail(e.target.value)} value={email} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder:[#ffffffc7] px-[20px] font-semibold' />
            <input type={show?"text":"password"} placeholder='Password' required onChange={(e)=> setPassword(e.target.value)} value={password} className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder:[#ffffffc7] px-[20px] font-semibold' />
            {!show && <LuEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%]' onClick={() => setShow(prev => !prev)}/>}
            {show && <IoEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%]' onClick={() => setShow(prev => !prev)}/>}
            <button className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold '>Create Account</button>
            <p className='flex gap-[10px]'>You have any account? <span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={() => navigate("/login")}>Login</span></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup