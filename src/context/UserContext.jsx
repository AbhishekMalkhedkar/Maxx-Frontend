import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react'
import { authDataContext } from './AuthContext';
import axios from 'axios';
import { useEffect } from 'react';


export const userDataContext  = createContext();

const UserContext = ({children}) => {

    const [userData, setUserData] = useState("");
    const {serverUrl} = useContext(authDataContext);
    
    const getCurrentUser = async () => {
        
        try {
            const result = await axios.get(serverUrl + '/api/user/getCurrentUser', {withCredentials: true});

            setUserData(result.data);
            console.log(result);
            
            
        } catch (error) {
            setUserData(null);
        
            
        }
    }

    useEffect(() => {
        getCurrentUser();
    }, [])

    const value = {
        userData, setUserData, getCurrentUser
    }

  return (
    <div>
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    </div>
  )
}

export default UserContext