import React, { useState } from 'react';
import { Button, Container, Input, Text } from 'retro-react'; // Use Input from retro-react
import '../App.css';

function SignupPage() {
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
    console.log('Sign in with', email, password);
  };

  return (
    <Container className="signup-page">
      <Text variant="h1">회원가입</Text>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
        sx={{ marginBottom: '10px' }}
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        sx={{ marginBottom: '10px' }}
      />
      <Input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호 확인"
        sx={{ marginBottom: '10px' }}
      />
      <Button onClick={handleSignUp} sx={{ opacity: 0.7 }}>
        회원가입
      </Button>
    </Container>
  );
}

export default SignupPage;
