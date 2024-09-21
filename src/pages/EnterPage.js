import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'retro-react';
import '../styles/pages/_Enterpage.scss';
import LoginPage from './LoginPage'; // 로그인 페이지 모달
import SignupPage from './SignupPage'; // 회원가입 페이지 모달

function EnterPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setIsLoginModalOpen(true); // 로그인 모달 열기
  };

  const handleSignupClick = () => {
    setIsSignupModalOpen(true); // 회원가입 모달 열기
  };

  const handleEnterClick = () => {
    navigate('/select');  // '/select' 경로로 이동
  };

  const closeModal = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
  };

  return (
    <div className="App">
      <video autoPlay loop muted className="video-background">
        <source src={`${process.env.PUBLIC_URL}/background.mp4`} type="video/mp4" />
        지원하지 않는 웹입니다.
      </video>

      <Container className="content">
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="Logo"
          className="logo"
          style={{ width: '400px', marginBottom: '40px' }}
        />

   <button style={{ marginBottom: '20px' }} onClick={handleEnterClick}>
          들어가기
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button onClick={handleLoginClick}>로그인</button>
          <button onClick={handleSignupClick}>회원가입</button>
        </div>
      </Container>

      {/* 로그인 모달 */}
      {isLoginModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <LoginPage closeModal={closeModal} />
          </div>
        </div>
      )}

      {/* 회원가입 모달 */}
      {isSignupModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <SignupPage closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default EnterPage;

