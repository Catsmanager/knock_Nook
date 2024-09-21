import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EnterPage from './pages/EnterPage';
import SelectPage from './pages/SelectPage';
import ResultPage from './pages/ResultPage';
import LoginPage from './pages/LoginPage';
import SignupPage from'./pages/LoginPage'
import './styles/main.scss';

function App() {
  const [markerPosition, setMarkerPosition] = useState(null); // 좌표 정보 상태

  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnterPage />} />
        <Route
          path="/select"
          element={<SelectPage setMarkerPosition={setMarkerPosition} />} // Page2에서 좌표 설정
        />
        <Route
          path="/result"
          element={<ResultPage markerPosition={markerPosition} />} // Page3에 좌표 전달
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
