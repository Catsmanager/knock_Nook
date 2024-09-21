import React, { useState } from 'react';
import '../styles/pages/_SignupPage.scss';  // SCSS 파일을 import

function SignupPage({ closeModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Signing up with', email, password);
    closeModal(); // 모달 닫기
  };

  return (
    <div className="signup-page">
      <h3>회원가입</h3> {/* Text 대신 h3 태그 */}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
        className="input-field"  // SCSS에서 스타일 적용
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        className="input-field"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호 확인"
        className="input-field"
      />
      <button
        onClick={handleSignUp}
        className="btn signup-btn"  // SCSS에서 스타일 적용
      >
        회원가입
      </button>
      <button
        onClick={closeModal}
        className="btn close-btn"
      >
        닫기
      </button>
    </div>
  );
}

export default SignupPage;


