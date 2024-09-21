import React, { useState } from 'react';
import { Button, Container, Input, Text } from 'retro-react'; // Use Input from retro-react
import './App.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with', email, password);
    // Add actual login logic here
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
