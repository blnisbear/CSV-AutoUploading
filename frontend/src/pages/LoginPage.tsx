import React, { useState, useCallback } from 'react';

import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Stack
} from '@mui/material';


type FormValues = { 
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<FormValues>({
    username: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormValues(prev => ({ ...prev, [name]: value }));
    },
    [] 
  );

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMessage(null);

      try {
        const response = await api.post('/login', formValues);
        localStorage.setItem('token', response.data.token); // บันทึก token ลง localStorage
        navigate('/computers');
      } catch (err: any) {
        setErrorMessage(err.response?.data?.error || 'Login failed');
      }
    },
    [formValues, navigate] 
  );

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        {/* Header */}
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>

        {/* Error Message */}
        <Stack spacing={2} sx={{ mb: 3 }}>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </Stack>

        {/* Login Form */}
        <Box component="form" onSubmit={handleLogin} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Username"
              name="username"
              value={formValues.username}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={formValues.password}
              onChange={handleChange}
              fullWidth
              required
            />

            <Button type="submit" variant="contained" size="large">
              Login
            </Button>
          </Stack>
        </Box>

        {/* Register Link */}
        <Box sx={{ mt: 2 }}>
          <Typography>
            Don't have an account?{' '}
            <Button variant="text" onClick={() => navigate('/register')}>
              Register
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
