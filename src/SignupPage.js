import React, { useState } from 'react';
import { Button, Container, Input, Text } from 'retro-react'; // Use Input from retro-react
import './App.css';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Signing up with', email, password);
    // Add actual sign-up logic here
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

