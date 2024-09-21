import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/_Enterpage.scss';
import LoginPage from './LoginPage'; // 로그인 페이지 모달
import SignupPage from './SignupPage'; // 회원가입 페이지 모달

function EnterPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);


  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleSignupClick = () => {
    setIsSignupModalOpen(true);
  };

  const handleEnterClick = () => {
    navigate('/select'); // '/select' 경로로 이동
  };

  const closeModal = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
  };

  return (
    <div className="enter-frame">
      <video autoPlay loop muted className="video-background">
        <source src={`${process.env.PUBLIC_URL}/background.mp4`} type="video/mp4" />
        지원하지 않는 웹입니다.
      </video>

      <div className="enter-container">
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="Logo"
          className="logo"
          style={{ width: '400px', marginBottom: '40px' }}
        />

        <div className="enter-btn-group">
          <button className="enter-btn" onClick={() => navigate('/select')}>
            들어가기
          </button>

          <div className="auth-btn-group">
            <button className="auth-btn" onClick={handleLoginClick}>
              로그인
            </button>
            <button className="auth-btn" onClick={handleSignupClick}>
              회원가입
            </button>
          </div>
        </div>
      </div>

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
