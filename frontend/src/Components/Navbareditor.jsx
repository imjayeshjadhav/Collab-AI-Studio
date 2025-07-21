import React from 'react'
import { VscDebugRestart } from "react-icons/vsc";

function Navbareditor() {
  return (
    <div>
       <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid ">
    <div>

    <a class="navbar-brand " href="#"><VscDebugRestart /></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    </div>


    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
       
        
        <li class="nav-item d-flex gap-4">
          <a class="nav-link disabled" aria-disabled="true">Disabled</a>
      <button className='btn bg-green rounded-pill ' style={{background:'green'}}>Run</button>
       <button className='btn bg-green rounded-pill ' style={{background:'blue'}}>Debug</button>
        </li>
      </ul>
      
    </div>
  </div>
</nav>
    </div>
      
    </div>
  )
}

export default Navbareditor
