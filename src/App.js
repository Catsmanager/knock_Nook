import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Page2 from './Page2';
import Page3 from './Page3';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

function App() {
  const [markerPosition, setMarkerPosition] = useState(null); // 좌표 정보 상태

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/page2" 
          element={<Page2 setMarkerPosition={setMarkerPosition} />} // Page2에서 좌표 설정
        />
        <Route 
          path="/page3" 
          element={<Page3 markerPosition={markerPosition} />} // Page3에 좌표 전달
        />
        <Route 
          path="/login"
          element={<LoginPage/>}/>
         <Route 
           path="/signup"
           element={<SignupPage/>}/>
      </Routes>

    </Router>
  );
}

export default App;

