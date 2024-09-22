import React, { useState } from 'react';

function SignupPage({ closeModal }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert('입력하신 두 비밀번호가 다릅니다');
      return;
    }

    const url = 'http://192.168.45.151:8080/signup';
    const data = {
      name: name,
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
      alert('회원가입이 완료되었습니다.');
      closeModal();
    } catch (error) {
      console.error('애러 발생: ', error);
    }
  };

  return (
    <div className="signup-container">
      <h3>회원가입</h3>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
        className="signup-input" // SCSS에서 스타일 적용
      />
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
        className="signup-input" 
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        className="signup-input"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호 확인"
        className="signup-input"
      />
      <div className="signup-btn-group">
        <button onClick={handleSignUp} className="btn signup">
          회원가입
        </button>
        <button onClick={closeModal} className="btn close">
          닫기
        </button>
      </div>
    </div>
  );
}

export default SignupPage;
