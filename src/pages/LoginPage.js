import React, { useState } from 'react';
import '../styles/pages/_LoginPage.scss';  // SCSS 파일을 import

function LoginPage({ closeModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with', email, password);
    closeModal(); // 모달 닫기
  };

  return (
    <div className="login-page">
      <h3>로그인</h3> {/* 기본 HTML 요소 사용 */}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
        className="input-field"  // SCSS로 스타일 적용
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        className="input-field"
      />
      <button
        onClick={handleLogin}
        className="btn login-btn"  // SCSS로 스타일 적용
      >
        로그인
      </button>
      <button
        onClick={closeModal}
        className="btn close-btn"  // 닫기 버튼 스타일링
      >
        닫기
      </button>
    </div>
  );
}

export default LoginPage;

