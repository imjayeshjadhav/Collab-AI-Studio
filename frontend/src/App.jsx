import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import SplitPane from "react-split-pane"
import Navbareditor from './Components/Navbareditor'
import Aipromt from './Components/Aipromt'
import Signup from './Components/Loginform/Signup'
import Loginf from './Components/Loginform/Loginf'
import CodeText from './Components/Codeeditor/CodeText'


function App() {

   const [user, setUser] = useState(null);

  

  return (
    <>
 
    {/* <Loginf/> */}
{/* <Signup/> */}
<div className='container-fluid vh-100'>


     <SplitPane className='slitepane '  split="vertical" minSize={50}>
  <div style={{backgroundColor:'grey' ,height:'100%'}}> <Navbar/></div>
  <div style={{backgroundColor:'grey' ,height:'100%'}}>
  <CodeText></CodeText>
  </div>
</SplitPane>
</div>
    {/* <Navbar/> */}
     
     
    </>
  )
}

export default App
