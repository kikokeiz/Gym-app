// src/pages/LoginPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/authService';
import { Box, TextField, Button, Typography, Link } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authService.login(email, password);
      localStorage.setItem('token', response.token);
      navigate('/dashboard'); // Redirige después del login
    } catch (err) {
      setError('Credenciales incorrectas');
      console.error('Login error:', err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 10,
        p: 4,
        boxShadow: 3,
        borderRadius: 2
      }}
    >
      <Typography variant="h5" gutterBottom textAlign="center">
        Iniciar Sesión
      </Typography>

      {error && (
        <Typography color="error" textAlign="center" mb={2}>
          {error}
        </Typography>
      )}

      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Contraseña"
        type="password"
        fullWidth
        margin="normal"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Ingresar
      </Button>

      <Typography textAlign="center">
        ¿No tienes cuenta?{' '}
        <Link href="/register" underline="hover">
          Regístrate
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginPage;