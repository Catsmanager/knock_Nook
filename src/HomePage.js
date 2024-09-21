import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Text } from 'retro-react';
import './App.css';

function HomePage() {
  const navigate = useNavigate();
  const [startWalking, setStartWalking] = useState(false);

  const handleButtonClick = () => {
    setStartWalking(true);

    setTimeout(() => {
      navigate('/page2');
    }, 1000);
  };

  // Add these functions to fix the error
  const handleLoginClick = () => {
    navigate('/login');  // Navigate to login page
  };

  const handleSignUpClick = () => {
    navigate('/signup'); // Navigate to signup page
  };

  return (
    <div className={`App ${startWalking ? 'walking' : ''}`}>
      <video autoPlay loop muted className="video-background">
        <source src={`${process.env.PUBLIC_URL}/background.mp4`} type="video/mp4" />
        지원하지 않는 웹입니다.
      </video>

      <Container className="content">
        <Text variant="h1">로고넣기</Text>
        <Button onClick={handleButtonClick} sx={{ opacity: 0.7, border: 'none' }}>
          들어가기
        </Button>

        {/* Login and Signup buttons */}
        <div className="auth-buttons">
          <Button onClick={handleLoginClick} sx={{ marginTop: '10px', opacity: 0.7 }}>
            로그인
          </Button>
          <Button onClick={handleSignUpClick} sx={{ marginTop: '10px', opacity: 0.7 }}>
            회원가입
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default HomePage;



