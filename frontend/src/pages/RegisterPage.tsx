// src/pages/RegisterPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Link, 
  Alert,
  CircularProgress
} from '@mui/material';

// Definición de tipos para TypeScript
type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Todos los campos son obligatorios');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Ingresa un email válido');
      return false;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const errorMessage =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        (err as Error).message ||
        'Error al registrar. Intenta nuevamente.';
      setError(errorMessage);    
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        minWidth: 600,
        mx: 'auto',
        mt: 10,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper'
      }}
      noValidate
    >
      <Typography variant="h5" gutterBottom textAlign="center" color="primary">
        Crear Cuenta
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

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
        autoFocus
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
        inputProps={{ pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" }}
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
        inputProps={{ minLength: 6 }}
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
        sx={{ mt: 3, mb: 2, height: 48 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Registrarse'}
      </Button>

      <Typography textAlign="center">
        ¿Ya tienes cuenta?{' '}
        <Link 
          href="/login" 
          underline="hover"
          onClick={(e) => {
            e.preventDefault();
            navigate('/login');
          }}
        >
          Inicia Sesión
        </Link>
      </Typography>
    </Box>
  );
};

export default RegisterPage;