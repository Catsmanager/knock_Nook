import React, { useState } from 'react';
import { Button, Container, Input, Text } from 'retro-react'; // Use Input from retro-react
import '../App.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const url = 'http://172.20.10.3:8080/login';

    const data = {
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
    console.log('login in with', email, password);
  };

  return (
    <Container className="login-page">
      <Text variant="h1">로그인</Text>
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
      <Button onClick={handleLogin} sx={{ opacity: 0.7 }}>
        로그인
      </Button>
    </Container>
  );
}

export default LoginPage;
