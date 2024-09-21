import React, { useState } from 'react';
import '../styles/pages/_SignupPage.scss'; // SCSS 파일을 import

function SignupPage({ closeModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    const url = 'http://172.20.10.3:8080/signup';

    const data = {
      name: '김김김',
      email: 'test@123.com',
      password: '4321',
    };

    try {
      console.log('시작');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log('종료');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
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
        className="input-field" // SCSS에서 스타일 적용
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
        className="btn signup-btn" // SCSS에서 스타일 적용
      >
        회원가입
      </button>
      <button onClick={closeModal} className="btn close-btn">
        닫기
      </button>
    </div>
  );
}

export default SignupPage;
