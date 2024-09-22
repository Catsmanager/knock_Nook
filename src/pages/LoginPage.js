import React, { useState } from 'react';

function LoginPage({ closeModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const url = 'http://192.168.45.151:8080/login';

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result);
      alert('로그인 되었습니다');
      closeModal(); // 모달 닫기
    } catch (error) {
      console.error('에러 발생: ', error);
    }
  };

  return (
    <div className="login-container">
      <h3>로그인</h3>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
        className="login-input" // SCSS로 스타일 적용
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        className="login-input"
      />
      <div className="login-btn-group">
        <button
          onClick={handleLogin}
          className="btn login" // SCSS로 스타일 적용
        >
          로그인
        </button>
        <button
          onClick={closeModal}
          className="btn close" // 닫기 버튼 스타일링
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
