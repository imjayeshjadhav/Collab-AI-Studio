import React from 'react'
import './Loginf.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";


 function Loginf() {
  return (
    <div className='wrapper'>
        <form action="">
            <h1>Login</h1>
            <div className="input-box">
                <input type="text" placeholder='Username' required />
                <FaUser className='icon' />

            </div>
            <div className="input-box">
                <input type="password" placeholder='password' required />  
                <FaLock className='icon' />  
            </div>

            <div className='remember-forgot'>
                <label><input type='checkbox'></input>remember me</label>
                <a href="#">Forgot password</a>
            </div>

            <button type='submit'>Login</button>

            <div className='resister-link'>
                <p>Don't have an account ?<a href="#">Sign Up</a></p>
            </div>

        </form>
      
    </div>
  )
}
export default Loginf