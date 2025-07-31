import React, { useContext, useState } from 'react'
import Logo from '../assets/maxlogo.png';
import { HiOutlineSearch } from "react-icons/hi";
import { FaUser } from "react-icons/fa6";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { userDataContext } from '../context/UserContext';
import { RiSearchFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';

const Nav = () => {

  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const {userData, getCurrentUser} = useContext(userDataContext);
  const {serverUrl} = useContext(authDataContext);

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {withCredentials:true});
      console.log(result.data);
      getCurrentUser();
      navigate("/login");
      
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black '>
        <div className='w-[30%] flex items-center justify-start gap-[10px]'>
            <img src={Logo} alt="" className='w-[30px]' />
            <h1 className='text-[25px] text-[black] font-sans ' >Maxx</h1>
        </div>
        <div className='w-[40%] '>
          <ul className='flex items-center justify-center gap-[19px] text-white '>
            <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl '>HOME</li>
            <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl '>COLLECTIONS</li>
            <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl '>ABOUT</li>
            <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl '>CONTACT</li>
          </ul>
        </div>
        <div className='w-[30%] flex items-center justify-end gap-[20px] '>
          {!showSearch && <HiOutlineSearch className='w-[38px] h-[38px] text-[#000000] cursor-pointer ' onClick={() => setShowSearch(prev=>!prev)}/>}
          {showSearch &&  <RiSearchFill  className='w-[35px] h-[35px] text-[#000000] cursor-pointer ' onClick={() => setShowSearch(prev=>!prev)}/>}
          {!userData && <FaUser className='w-[29px] h-[29px] text-[#000000] cursor-pointer ' onClick={() => setShowProfile(prev=>!prev)}/>}
          {userData && <div className='w-[30px] h-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center cursor-pointer' onClick={() => setShowProfile(prev=>!prev)}>{userData?.name.slice(0,1)}</div>}
          <RiShoppingCart2Fill className='w-[38px] h-[38px] text-[#000000] cursor-pointer ' />
          <p className='absolute w-[18px] h-[18px] items-center md:flex justify-center bg-black px-[5px] py[2px] text-white rounded-full text-[9px] top-[10px] right-[23px] hidden ' >10</p>
        </div>
        {showSearch && <div className='w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 right-0 flex items-center justify-center '>
          <input type="text" className='w-[50%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-[white] text-[18px] ' placeholder='Search Here' />

        </div>}

        {showProfile && <div className='absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[10px] z-10 '>
          <ul className='w-[100%] h-[100%] flex items-start justify-around flex-col text-[17px] py-[10px] text-white '>
            {!userData && <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer  ' onClick={() => {navigate("/login"); setShowProfile(false)}}>Login</li>}
            {userData && <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer  ' onClick={()=>{handleLogout(); setShowProfile(false)}}>Logout</li>}
            <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer  '>Orders</li>
            <li className='w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer  '>About</li>
          </ul>
        </div>}

    </div>
  )
}

export default Nav