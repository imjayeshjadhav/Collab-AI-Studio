import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import CodeText from './Components/Codeeditor/CodeText';
import SplitPane from "react-split-pane";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {

  return (
    <div className='container-fluid vh-100'>
      <Navbar/>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Signup Route */}
        <Route path="/signup" element={<Signup />} />

        {/* Main Editor Route */}
        <Route
          path="/"
          element={
            <SplitPane className='slitepane' split="vertical" minSize={50}>
              <div style={{ backgroundColor: 'grey', height: '100%' }}>
                <Navbar />
              </div>
              <div style={{ backgroundColor: 'grey', height: '100%' }}>
                <CodeText />
              </div>
            </SplitPane>
          }
        />
        {/* <Route path="/aiprompt" element={<Aipromt />} /> */}
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
}

export default App;
