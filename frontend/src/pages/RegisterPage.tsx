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

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<FormValues>({
    username: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null); 
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = useCallback( 
    (e: React.ChangeEvent<HTMLInputElement>) => { 
      const { name, value } = e.target; 
      setFormValues(prev => ({ ...prev, [name]: value })); 
    },
    [] 
  );

  const handleRegister = useCallback( 
    async (e: React.FormEvent) => { 
      e.preventDefault(); 
      setErrorMessage(null); 
      setSuccessMessage(null); 

      try {
        await api.post('/register', formValues); 
        setSuccessMessage('Registration successful! You can now log in.'); 
      } catch (err: any) {
        setErrorMessage(err.response?.data?.error || 'Registration failed'); 
      }
    },
    [formValues] 
  );

  return (
    <Container maxWidth="sm"> 
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        {/* Header */}
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>

        {/* Error and Success Messages */}
        <Stack spacing={2} sx={{ mb: 3 }}>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
        </Stack>

        {/* Form */}
        <Box component="form" onSubmit={handleRegister} noValidate>
          <Stack spacing={2}>
            <TextField //Input
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
              Register
            </Button>
          </Stack>
        </Box>

        {/* Login Link */}
        <Box sx={{ mt: 2 }}>
          <Typography>
            Already a member?{' '}
            <Button variant="text" onClick={() => navigate('/login')}>
              Login
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
