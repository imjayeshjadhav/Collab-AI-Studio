import React from 'react'
import './Signup.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

 function Signup() {
  return (
     <div className='wrapper'>
            <form action="">
                <h1>sing Up</h1>
                 <div className="input-box">
                    <input type="text" placeholder='email' required />
                    <MdEmail className='icon' />
                </div>

                <div className="input-box">
                    <input type="text" placeholder='Username' required />
                    <FaUser className='icon' />
                </div>

                <div className="input-box">
                    <input type="password" placeholder='password' required />  
                    <FaLock className='icon' />  
                </div>
    
               
    
                <button type='submit'>Sign Up</button>
    
                <div className='resister-link'>
                    <p>sign up with social media</p>
                </div>
    
            </form>
          
        </div>
  )
}
export default Signup
