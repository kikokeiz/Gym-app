// src/pages/RegisterPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/authService';
import { 
  Box, TextField, Button, Typography, Link, Alert 
} from '@mui/material';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      setSuccess(true);
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Error al registrar. Intenta nuevamente.');
      console.error('Registration error:', err);
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
        Crear Cuenta
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          ¡Registro exitoso! Redirigiendo...
        </Alert>
      )}

      <TextField
        label="Nombre completo"
        name="name"
        fullWidth
        margin="normal"
        required
        value={formData.name}
        onChange={handleChange}
      />

      <TextField
        label="Email"
        type="email"
        name="email"
        fullWidth
        margin="normal"
        required
        value={formData.email}
        onChange={handleChange}
      />

      <TextField
        label="Contraseña"
        type="password"
        name="password"
        fullWidth
        margin="normal"
        required
        value={formData.password}
        onChange={handleChange}
      />

      <TextField
        label="Confirmar Contraseña"
        type="password"
        name="confirmPassword"
        fullWidth
        margin="normal"
        required
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Registrarse
      </Button>

      <Typography textAlign="center">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" underline="hover">
          Inicia Sesión
        </Link>
      </Typography>
    </Box>
  );
};

export default RegisterPage;