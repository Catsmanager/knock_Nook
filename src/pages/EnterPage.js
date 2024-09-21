import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'retro-react'; // Removed Button from here
import '../styles/pages/_Enterpage.scss'

function EnterPage() {
  const navigate = useNavigate();
  const [startWalking, setStartWalking] = useState(false);

  const handleButtonClick = () => {
    setStartWalking(true);
    setTimeout(() => {
      navigate('/select');
    }, 1000);
  };

  const handleLoginClick = () => {
    navigate('/login'); // Example: Navigating to login page
  };

  const handleSignupClick = () => {
    navigate('/signup'); // Example: Navigating to signup page
  };

  return (
    <div className={`App ${startWalking ? 'walking' : ''}`}>
      <video autoPlay loop muted className="video-background">
        <source src={`${process.env.PUBLIC_URL}/background.mp4`} type="video/mp4" />
        지원하지 않는 웹입니다.
      </video>

      <Container className="content">
        {/* Logo image */}
        <img 
          src={`${process.env.PUBLIC_URL}/logo.png`} 
          alt="Logo" 
          className="logo" 
          style={{ width: '400px', marginBottom: '40px' }} 
        />

        {/* 들어가기 Button */}
        <button 
          style={{marginBottom:'20px'}}
          onClick={handleButtonClick}
        >
          들어가기
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button 
            onClick={handleLoginClick}
          >
            로그인
          </button>
          <button 

            onClick={handleSignupClick}
          >
            회원가입
          </button>
        </div>
      </Container>
    </div>
  );
}

export default EnterPage;


